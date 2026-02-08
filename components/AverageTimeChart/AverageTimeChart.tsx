import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function AverageTimeChart({
  data,
}: {
  data: { employeeName: string; averageTimeInSeconds: number }[];
}) {
  // Prepare data for the chart
  const chartData = {
    labels: data.map((item) => item.employeeName), // Employee names
    datasets: [
      {
        label: "Average Time to Send (Minutes)",
        data: data.map((item) => item.averageTimeInSeconds / 60), // Average time for each employee
        backgroundColor: "#1d2a51",
        borderColor: "#1d2a51",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    indexAxis: "y" as const, // Make bars horizontal
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true, // Enable the title
        text: "Average Time to Send per Employee (Minutes)", // Title text
        font: {
          size: 18, // Title font size
          weight: "bold" as const, // Title font weight
        },
        padding: {
          bottom: 20, // Space below the title
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Ensures the X-axis starts from 0
      },
      y: {
        ticks: {
          font: {
            size: 10, // Font size of the labels
          },
        },
        // Optional: Customize Y-axis properties if needed
      },
    },
  };

  return (
    <Bar
      data={chartData}
      options={chartOptions}
      className="bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm"
    />
  );
}
