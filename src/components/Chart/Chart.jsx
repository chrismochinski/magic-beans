import React, { useRef } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid, Typography } from '@mui/material'

import { Bar, Line, Pie, Doughnut, defaults } from 'react-chartjs-2'
import { chartConfig  } from './ChartConfig'
import { ColorLensOutlined, ConstructionOutlined } from '@mui/icons-material'
// import { Chart } from 'chart.js'

function Chart({ id, coinName }) {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(store => store.user)
    const [chartData, setChartData] = useState([]);


    /*GET*/
    //API
    //todo needs own page = chartPage
    useEffect(() => {
        setIsLoading(true) // begin loading
        dispatch({ type: 'FETCH_COIN_LIST' })
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`)
            .then(res => {       
                changeToObjects(res.data.prices)         
            }).catch(error => console.log('error getting cryptos:', error))
    }, [])

let finalArray = [];

    const changeToObjects = (data) => {
        console.log('data is:', data)
        for(let eachArray of data){
            finalArray.push({x: eachArray[0], y: eachArray[1]})
        }
        console.log('final array is:', finalArray)
        setChartData(finalArray)
        setIsLoading(false)
    }

    const renderData = () => {
        return chartData
    }

    const lineColor = () => {
        console.log('chart crap:', chartData[0].y, chartData[24].y)
        if (chartData[0].y > chartData[24].y){
            return 'red'
        } else { 
            return 'green'
        }
    }
 
    return (
        <div>
            {chartData.length === 0 ? <img className='coinDetailLoading' width='100px' src='./images/bitcoinLogoSpinning.gif' /> :


                // <canvas ref={chartRef} id="myChart" width={250} height={250}>

                <div style={{backgroundColor: 'paper'}}>

                    <Line
                        data={{
                            labels: ['','','','','','','','','','','','','','','','','','','','','','','','','',],
                            datasets: [{
                                label: `24h ${coinName} Price`,
                                // animations: false,
 
                                
                                data: renderData(),
                                backgroundColor: lineColor(),
                                borderColor: lineColor(),
                                borderWidth: 3,
                                pointRadius: 0,

                            },
                                // {
                                //     label: 'Quantity',
                                //     data: [55, 104, 67, 93, , 50],
                                //     backgroundColor: 'orange',
                                //     borderColor: 'blue',
                                // },

                            ],
                        }}
                        height={400}
                        width={600}
                        options={{
                            // maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        time: 'time',
                                        distribution: 'linear'
                                    },
                                ],
                            },
                        }}
                    />

                </div>


                // </canvas>

            }

        </div>
    )
}

export default Chart
