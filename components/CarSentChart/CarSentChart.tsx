import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
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

export default function CarSentChart({
  data,
}: {
  data: { employee: string; carsSent: number; carsAttack: number }[];
}) {
  const chartData = {
    labels: data.map((item) => item.employee),
    datasets: [
      {
        label: "All Leads Cars",
        data: data.map((item) => item.carsSent - item.carsAttack),
        backgroundColor: "#1d2a51",
        borderColor: "#1d2a51",
        borderWidth: 0.5,
      },
      {
        label: "Attack Cars",
        data: data.map((item) => item.carsAttack),
        backgroundColor: "#ffb3b3",
        borderColor: "#ffb3b3",
        borderWidth: 0.5,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true, // Stack the datasets
      },
      x: {
        stacked: true, // Stack the datasets
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
