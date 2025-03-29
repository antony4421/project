import { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Header from "components/Headers/Header.js";

const Home = (props) => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const activeData = [120, 115, 130, 125, 140, 135, 125];
  const absentData = [10, 15, 8, 12, 7, 10, 9];
  const activeToday = activeData[activeData.length - 1];
  const absentToday = absentData[absentData.length - 1];

  const [events] = useState([
    { date: "March 15, 2025", title: "Annual General Meeting" },
    { date: "March 20, 2025", title: "Employee Training Session" },
    { date: "March 25, 2025", title: "Company Outing" },
  ]);

  useEffect(() => {
    if (lineChartInstance.current) lineChartInstance.current.destroy();
    if (barChartInstance.current) barChartInstance.current.destroy();

    const lineCtx = lineChartRef.current.getContext("2d");
    const barCtx = barChartRef.current.getContext("2d");

    lineChartInstance.current = new Chart(lineCtx, {
      type: "line",
      data: {
        labels: days,
        datasets: [
          {
            label: "Active Employees",
            data: activeData,
            borderColor: "#4CAF50",
            borderWidth: 2,
            pointBackgroundColor: "#4CAF50",
            tension: 0.3,
          },
          {
            label: "Absent Employees",
            data: absentData,
            borderColor: "#F44336",
            borderWidth: 2,
            pointBackgroundColor: "#F44336",
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "top" },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    barChartInstance.current = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Active Employees", "Absent Employees"],
        datasets: [
          {
            label: "Today’s Stats",
            data: [activeToday, absentToday],
            backgroundColor: ["#4CAF50", "#F44336"],
            borderRadius: 10,
            barThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "top" },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => {
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, []);

  return (
    <>
      <AdminNavbar {...props} />
      <Header />

      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Employee Attendance (Last 7 Days)
              </h2>
              <div className="h-80">
                <canvas ref={lineChartRef}></canvas>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Today's Employee Status
              </h2>
              <div className="h-80 flex justify-center">
                <canvas ref={barChartRef}></canvas>
              </div>
            </div>
          </div>

          {/* Right Section - Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Upcoming Events 📅
            </h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="p-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    {event.title}
                  </p>
                  <p className="text-gray-500">{event.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
