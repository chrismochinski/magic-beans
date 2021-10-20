

export const chartConfig = {
    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1.5
    },

    animation: {
        duration: 2000
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [
            {
                time: 'time',
                distribution: 'linear'
            }
        ],
    }
}



