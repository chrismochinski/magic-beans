import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

function Chart({ id, coinName }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((store) => store.user);
  const [chartData, setChartData] = useState([]);

  /**
   * @api {get} from CoinGecko's fabulous free API
   * (though I may pony up since they're so awesome...)
   */
  useEffect(() => {
    setIsLoading(true); // begin loading
    dispatch({ type: "FETCH_COIN_LIST" });
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`
      )
      .then((res) => {
        changeToObjects(res.data.prices);
      })
      .catch((error) => console.log("error getting cryptos:", error));
  }, []);

  let finalArray = [];

  const changeToObjects = (data) => {
    for (let eachArray of data) {
      finalArray.push({ x: eachArray[0], y: eachArray[1] });
    }
    setChartData(finalArray);
    setIsLoading(false);
  };

  const renderData = () => {
    return chartData;
  };

  const lineColor = () => {
    if (chartData[0].y > chartData[24].y) {
      return "red";
    } else {
      return "green";
    }
  };

  // chartData conditional ( < 25 ) will changed to 23
  // hours of data (for some reason) between the
  // hours of appx 12a and 3a

  return (
    <div>
      {chartData.length < 25 ? (
        <img
          className="coinDetailLoading"
          width="100px"
          src="./images/bitcoinLogoSpinning.gif"
        />
      ) : (
        <div>
          <Line
            data={{
              datasets: [
                {
                  label: `24h ${coinName} Price`,
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
                  easing: "linear",
                  from: 1,
                  to: 0,
                  loop: true,
                },
              },
              scales: {
                x: {
                  type: "time",
                },
                y: {
                  beginAtZero: false,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Chart;
