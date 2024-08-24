
import React, { useContext, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ReactProvider } from "../Context/ReactContent";
import { Button } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import PieChartInputs from "./PieChartinput";


const PieChart = () => {
  const { pieCharts, selectedPieCharts, setSelectedPieCharts } =
    useContext(ReactProvider);
  const [openPie, setOpenPie] = useState(false);

  // Filter charts to show only those selected
  const filteredCharts = pieCharts.filter(
    (chart) => selectedPieCharts[chart.title]
  );

  return (
    <>
      <PieChartInputs open={openPie} close={() => setOpenPie(false)} />

      <div className="row justify-content-center p-2 justify-content-lg-start">
        {filteredCharts.length > 0 &&
          filteredCharts.map((chart, index) => {
            // Extract labels and values from the chart data
            const labels = chart.data.map((dataPoint) => dataPoint.label);
            const series = chart.data.map((dataPoint) => dataPoint.value);

            const options = {
              chart: {
                width: 300,
                type: "donut",
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270,
                },
              },
              labels, // Add labels to the options
              dataLabels: {
                enabled: true,
                formatter: (val, opts) => {
                  const total = opts.w.globals.seriesTotals.reduce(
                    (a, b) => a + b,
                    0
                  );
                  const percentage = ((val / total) * 100).toFixed(1);
                  return `${percentage}%`;
                },
              },
              legend: {
                formatter: function (val, opts) {
                  return val + " - " + opts.w.globals.series[opts.seriesIndex];
                },
              },
              title: {
                text: chart.title || `Chart ${index + 1}`,
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 350,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            };

            return (
              <div
                className="col-12 col-md-6 col-xl-4 col-xxl-3 set-position"
                key={index}
              >
                <div className="bg-white border p-3 rounded-4">
                  <h5 className="">{chart.title || `Chart ${index + 1}`} </h5>
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="donut"
                    width={360}
                  />
                </div>
              </div>
            );
          })}
        <div className="PieChart_Add border rounded-4 bg-white col-12 col-md-6 col-lg-3">
          <Button
            onClick={() => setOpenPie(true)}
            variant="light"
            className="border pb-2"
          >
            <IoIosAdd size={20} color="gray" /> Add widget
          </Button>
        </div>
      </div>
    </>
  );
};

export default PieChart;


