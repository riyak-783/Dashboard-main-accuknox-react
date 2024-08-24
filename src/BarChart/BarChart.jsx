import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ReactProvider } from '../Context/ReactContent';
import { Button } from 'react-bootstrap';
import { IoIosAdd } from 'react-icons/io';
import BarChartInput from './BarChartInput';

const BarChart = () => {
    const { charts, selectedCharts } = useContext(ReactProvider);
    const [openBar, setOpenbar] = useState(false)

    const filteredCharts = charts.filter(chart => selectedCharts[chart.title]);

    return (
        <>
            <BarChartInput open={openBar} close={() => setOpenbar(false)} />

            <div className='row justify-content-center p-2 justify-content-lg-start' >
                {filteredCharts.length > 0 && filteredCharts.map((chart, index) => {
                    const options = {
                        chart: {
                            type: 'bar',
                            height: 200
                        },
                        plotOptions: {
                            bar: {
                                columnWidth: '35%', // Adjust this percentage to change the width of each column
                            },
                        },
                        xaxis: {
                            type: 'category',
                            labels: {
                                formatter: function (val) {
                                    return val;
                                }
                            }
                        },
                        title: {
                            text: '',
                            // text: chart.title || `Chart ${index + 1}`,
                        },
                        tooltip: {
                            x: {
                                formatter: function (val) {
                                    return "Value: " + val;
                                }
                            }
                        },
                    };

                    const series = [{
                        name: "Sales",
                        data: chart.data || []
                    }];

                    return (
                        <div className='col-12 col-md-6 col-xl-4 col-xxl-3  set-position ' key={index} style={{ marginBottom: '20px' }}>
                            <div className='bg-white border p-3 rounded-4 '>
                            <h5 className=''>{chart.title || `Chart ${index + 1}`}</h5>
                            <ReactApexChart options={options} series={series} type="bar" height={200} width={360} />
                            </div>
                        </div>
                    );
                })}
                <div className='BarChart_Add border rounded-4 bg-white col-12 col-md-6 col-lg-3'>
                    <Button onClick={() => setOpenbar(true)} variant="light" className='border pb-2'>
                        <IoIosAdd size={20} color='gray' />  Add widget
                    </Button>{' '}
                </div>
            </div>
        </>

    );
};

export default BarChart;
