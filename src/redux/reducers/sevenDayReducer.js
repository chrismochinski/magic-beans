//deletelater


//GET SEVEN DAY CHART
const sevenDayChartReducer = (state = [], action) => {
    switch (action.type) {
        case 'SEND_7_DAY_CHART_DATA':
            return [...state, action.payload]
        default:
            return state;

    }
};

export default sevenDayChartReducer;


//deletelater