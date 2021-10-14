import { combineReducers } from 'redux'; //fix??

//GET MASTER LIST
const cryptoListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CRYPTO_LIST':
            return action.payload
        default:
            return state;

    }
};

export default cryptoListReducer;
