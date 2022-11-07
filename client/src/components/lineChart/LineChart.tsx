import React from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { History } from "../../interfaces/History";

interface LineChartProps {
  history: History[];
}

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const LineChart = ({ history }: LineChartProps) => {
  const month = history.map((e) => {
    const date = new Date(e.time);

    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  });

  const data = {
    labels: month,
    datasets: [
      {
        label: "Price usd",
        data: history.map((e) => e.priceUsd),
        fill: true,
        pointBorderColor: "#8884d8",
        pointBorderWidth: 2,
        pointRadius: 1,
        tension: 1,
      },
    ],
  };

  return <Line data={data} style={{ maxHeight: "300px" }} />;
};
