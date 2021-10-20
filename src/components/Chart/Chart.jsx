import React, { useRef } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid, Typography } from '@mui/material'

import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns';

import { chartConfig } from './ChartConfig'
import { ColorLensOutlined, ConstructionOutlined } from '@mui/icons-material'
// import { Chart } from 'chart.js'

function Chart({ id, coinName }) {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(store => store.user)
    const [chartData, setChartData] = useState([]);
    const [time, setTime] = useState();


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
        for (let eachArray of data) {
            finalArray.push({ x: eachArray[0], y: eachArray[1] })
        }
        console.log('final array is:', finalArray)
        setChartData(finalArray)

    
            //deletelater time crap
        // let today = new Date();
        // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        // let currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // setTime(currentTime);
        // console.log('time is', time)



        setIsLoading(false)
    }

    const renderData = () => {
        return chartData
    }

    const lineColor = () => {
        if (chartData[0].y > chartData[24].y) {
            return 'red'
        } else {
            return 'green'
        }
    }

    return (
        <div>
            {chartData.length < 24 ? <img className='coinDetailLoading' width='100px' src='./images/bitcoinLogoSpinning.gif' /> :

                <div>

                    <Line
                        data={{
                            // labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',],
                            datasets: [{
                                label: `24h ${coinName} Price`,
                                // fill: true, //fills bottom of chart with color
                                data: renderData(),
                                backgroundColor: lineColor(),
                                borderColor: lineColor(),
                                borderWidth: 3,
                                pointRadius: 0,

                            },
                            ],
                        }}
                        height={400}
                        width={600}
                        options={{
                            animations: {
                                tension: {
                                    duration: 1000,
                                    easing: 'linear',
                                    from: 1,
                                    to: 0,
                                    loop: true
                                }
                            },
                            // maintainAspectRatio: false,
                            scales: {
                                x: {
                                    type: 'time',
                                },
                                y: {
                                    beginAtZero: false,
                                },
                            },
                        }}
                    />

                </div>
            }
        </div>
    )
}

export default Chart
