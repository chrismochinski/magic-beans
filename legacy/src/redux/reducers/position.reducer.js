import { combineReducers } from 'redux'; //fix??

//GET MASTER LIST
const positionReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USER_POSITIONS':
            return [action.payload]
        default:
            return state;

    }
};

export default positionReducer;
