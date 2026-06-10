

const coinDetailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_COIN_DETAILS':
            return action.payload
        default:
            return state;

    }
};

export default coinDetailsReducer;