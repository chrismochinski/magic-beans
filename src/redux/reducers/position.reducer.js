import { combineReducers } from 'redux'; //fix??

//GET MASTER LIST
const positionReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POSITION_TO_REDUX':
            return action.payload
        default:
            return state;

    }
};

export default positionReducer;
