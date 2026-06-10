import { combineReducers } from 'redux'; //fix??

//GET USER HOLDINGS
const holdingsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_HOLDINGS':
            return action.payload
        default:
            return state;

    }
};

export default holdingsReducer;
