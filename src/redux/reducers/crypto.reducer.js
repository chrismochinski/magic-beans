
//updated bam
const cryptoListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CRYPTO_LIST':
            return action.payload
        default:
            return state;
    }
};

export default cryptoListReducer;

