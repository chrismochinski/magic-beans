
      //important use this name over in instance of store?
const cryptoListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CRYPTO_LIST':
            return action.payload
        default:
            return state;
    }
};

export default cryptoListReducer;

//updated done?????