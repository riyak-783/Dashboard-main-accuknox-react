
import React, { useContext, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ReactProvider } from '../Context/ReactContent';
import { Button } from 'react-bootstrap';
import { IoIosAdd } from 'react-icons/io';
import RadarChartInput from './RadarChartInput';

const RadarChart = () => {
  const { radarCharts, selectedRadarCharts } = useContext(ReactProvider);

  const [openRadar, setOpenRadar] = useState(false);

  const filteredCharts = radarCharts.filter(chart => selectedRadarCharts[chart.title]);

 

  return (
    <>
    <RadarChartInput open={openRadar} close={() => setOpenRadar(false)} />

    <div className='row justify-content-center p-2 justify-content-lg-start'>
      {filteredCharts.length > 0 && filteredCharts.map((chart, index) => {
        const options = {
          chart: {
            type: 'radar',
            height: 350
          },
          title: {
            text: '',
            // text: chart.title || `Chart ${index + 1}`,
          },
          xaxis: {
            categories: chart.data.map((_, i) => `Category ${i + 1}`)
          }
        };

        const series = [{
          name: chart.title,
          data: chart.data
        }];

        return (
          <div className='col-12 col-md-6 col-xl-4 col-xxl-3 set-position' key={index} style={{ marginBottom: '20px' }}>
            <div className='bg-white border p-3 rounded-4 '>
            <h5 className=''>{chart.title || `Chart ${index + 1}`}</h5>
            <ReactApexChart options={options} series={series} type="radar" height={200} />
            </div>
          </div>
        );
      })}
      <div className='RadarChart_Add border rounded-md bg-white col-12 col-md-6 col-lg-3'>
        <Button onClick={() => setOpenRadar(true)} variant="light" className='border pb-2'>
          <IoIosAdd size={20} color='gray' /> Add widget
        </Button>
      </div>
    </div>
    </>

  );
};

export default RadarChart;

