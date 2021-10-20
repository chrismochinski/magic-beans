import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Container, Button } from '@material-ui/core';
import useStyles from '../styles/styles';
import swal from 'sweetalert';

const ModifyPage = () => {

    const store = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id, name, held } = useParams();
    const [coinModNumber, setCoinModNumber] = useState();
    const [heldNumber, setHeldNumber] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleModifyCoins = () => {
        console.log('handleModifyCoins function')
        swal({
            title: "Rad!",
            text: `You now hold ${coinModNumber} ${name} tokens.`,
            icon: "success",
        });
        dispatch({
            type: 'MODIFY_POSITION',
            payload: {
                id: id,
                mod: coinModNumber,
                user_id: store.user.id
            }
        })
        goHome();
    }

    const goHome = () => {
        history.push('/user')
    }

    return (
        <div>

            <img src="/images/mb-mod-logo.png" className="modLogo" style={{ marginTop: '20px', marginBottom: '15px' }} width="200px" />

            <Typography className={classes.modHeader} variant="h6" >You currently hold <b>{held} {name}</b> coins.</Typography>

            <Typography className={classes.modPreInput}>Enter a new amount?</Typography>
            <form onSubmit={handleModifyCoins}>
                <Container style={{ justifyContent: 'center', textAlign: 'center' }}>

                    <TextField
                        spacing={0}
                        inputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 22 } }}
                        style={{ width: '50%' }}
                        id="standard-basic"
                        variant="standard"
                        type="number"
                        required
                        value={coinModNumber}
                        className="coinInput"
                        label="New Amount"
                        onChange={(event) => setCoinModNumber(event.target.value)} //important setting amount user is modifying to
                    /><br />


                    <Button style={{ fontSize: "20px", fontWeight: 'bold', backgroundColor: "green", color: 'white' }}
                        variant="contained"
                        size="medium"
                        type="submit"
                        className={classes.modifyButton}>Modify</Button><br />
                    <Button variant="contained" size="medium" className={classes.cancelButton} onClick={() => goHome()}>Cancel</Button>

                </Container>
            </form>



        </div>
    )
}

export default ModifyPage;
