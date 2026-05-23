import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function VideoChart({ videos }) {
  const data = {
    labels: videos.map((v) => v.title),
    datasets: [
      {
        label: "Views",
        data: videos.map((v) => v.views),
      },
    ],
  };

  return <Bar data={data} />;
}
