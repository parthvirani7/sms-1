import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TotalBalanceChart() {
  const [selectedRange, setSelectedRange] = useState("Last month");

  // Data for each range
  const dataByRange = {
    "Last week": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Balance",
          data: [5000, 10000, 12000, 15000, 20000, 25000, 30000],
          fill: false,
          backgroundColor: "#6B75FF",
          borderColor: "#6B75FF",
          pointBackgroundColor: "#6B75FF",
          pointBorderColor: "#6B75FF",
          tension: 0.4,
        },
      ],
    },
    "Last month": {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Balance",
          data: [10, 15, 25, 20, 30, 35, 30, 40, 45, 30, 35, 50],
          fill: false,
          backgroundColor: "#6B75FF",
          borderColor: "#6B75FF",
          pointBackgroundColor: "#6B75FF",
          pointBorderColor: "#6B75FF",
          tension: 0.4,
        },
      ],
    },
    "Last year": {
      labels: ["2023 Q1", "2023 Q2", "2023 Q3", "2023 Q4"],
      datasets: [
        {
          label: "Balance",
          data: [100, 120, 150, 200],
          fill: false,
          backgroundColor: "#6B75FF",
          borderColor: "#6B75FF",
          pointBackgroundColor: "#6B75FF",
          pointBorderColor: "#6B75FF",
          tension: 0.4,
        },
      ],
    },
  };

  const data = dataByRange[selectedRange];

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#6B7280" },
      },
      x: {
        ticks: { color: "#6B7280" },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-600">Total Balance</h2>
        <div className="relative">
          <select
            className="border-2 border-gray-100 text-gray-800 p-1 rounded-lg outline-none"
            onChange={(e) => setSelectedRange(e.target.value)}
            value={selectedRange}
          >
            <option>Last week</option>
            <option>Last month</option>
            <option>Last year</option>
          </select>
        </div>
      </div>
      <div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default TotalBalanceChart;
