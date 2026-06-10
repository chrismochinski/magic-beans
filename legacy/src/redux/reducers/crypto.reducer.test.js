import cryptoListReducer from './crypto.reducer.js'

describe('Crypto reducer tests', () => { 
    test('testing the crypto list result.', (done) => {
        let action = {
            type: "SET_CRYPTO_LIST"
        }
        let output = cryptoListReducer(undefined, action)
        expect(typeof output).toBe('undefined');
        done();
    })
});

