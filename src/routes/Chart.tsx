import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import { useState } from "react";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
export interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const [candleChart, setCandleChart] = useState(false);
  const changeChart = () => setCandleChart((prev) => !prev);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const candleData = data?.map((item) => {
    let time = item.time_open;
    let price = [item.open, item.high, item.low, item.close];
    return { x: time, y: price };
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <button onClick={changeChart}>change chart</button>
          {candleChart ? (
            <ApexChart
              type="candlestick"
              series={[
                {
                  data: candleData,
                },
              ]}
              options={{
                theme: { mode: isDark ? "dark" : "light" },
                chart: {
                  toolbar: { show: false },
                  height: 500,
                  width: 500,
                  background: "transparent",
                },
                grid: { show: false },
                stroke: { curve: "smooth", width: 5 },
                yaxis: { show: false },
                xaxis: {
                  axisTicks: { show: false },
                  axisBorder: { show: false },
                  labels: {
                    show: false,
                  },
                  type: "datetime",
                  categories: data?.map((time) => time.time_close),
                },
                fill: {
                  type: "gradient",
                  gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                },
                colors: ["#0fbcf9"],
                tooltip: {
                  y: {
                    formatter: (value) => `$ ${value.toFixed(3)}`,
                  },
                },
              }}
            />
          ) : (
            <ApexChart
              type="line"
              series={[
                { name: "prices", data: data?.map((price) => price.close) },
              ]}
              options={{
                theme: { mode: isDark ? "dark" : "light" },
                chart: {
                  toolbar: { show: false },
                  height: 500,
                  width: 500,
                  background: "transparent",
                },
                grid: { show: false },
                stroke: { curve: "smooth", width: 5 },
                yaxis: { show: false },
                xaxis: {
                  axisTicks: { show: false },
                  axisBorder: { show: false },
                  labels: {
                    show: false,
                  },
                  type: "datetime",
                  categories: data?.map((time) => time.time_close),
                },
                fill: {
                  type: "gradient",
                  gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                },
                colors: ["#0fbcf9"],
                tooltip: {
                  y: {
                    formatter: (value) => `$ ${value.toFixed(3)}`,
                  },
                },
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Chart;
