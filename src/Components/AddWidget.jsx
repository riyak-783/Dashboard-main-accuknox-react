

import React, { useContext, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ReactProvider } from '../Context/ReactContent';
import BarChartInput from '../BarChart/BarChartInput';
import RadarChartInput from '../RadarChart/RadarChartInput';
import PieChartInputs from '../PieChart/PieChartinput';

const AddWidget = ({ show, handleClose }) => {
    const [openBar, setOpenBar] = useState(false);
    const [openPie, setOpenPie] = useState(false);
    const [openRadar, setOpenRadar] = useState(false);
    const { charts, pieCharts, radarCharts, setSelectedCharts, setSelectedPieCharts, setSelectedRadarCharts } = useContext(ReactProvider);

    const [tempCharts, setTempCharts] = useState({});
    const [tempPieCharts, setTempPieCharts] = useState({});
    const [tempRadarCharts, setTempRadarCharts] = useState({});

    useEffect(() => {
        if (charts.length > 0) {
            setTempCharts(prevSelected => {
                const initialState = { ...prevSelected };
                charts.forEach(chart => {
                    if (initialState[chart.title] === undefined) {
                        initialState[chart.title] = true; 
                    }
                });
                return initialState;
            });
        }

        if (pieCharts.length > 0) {
            setTempPieCharts(prevSelected => {
                const initialState = { ...prevSelected };
                pieCharts.forEach(chart => {
                    if (initialState[chart.title] === undefined) {
                        initialState[chart.title] = true; 
                    }
                });
                return initialState;
            });
        }

        if (radarCharts.length > 0) {
            setTempRadarCharts(prevSelected => {
                const initialState = { ...prevSelected };
                radarCharts.forEach(chart => {
                    if (initialState[chart.title] === undefined) {
                        initialState[chart.title] = true; 
                    }
                });
                return initialState;
            });
        }
    }, [charts, pieCharts, radarCharts]);

    const handleCheckboxChange = (title, chartType) => {
        console.log(title, chartType);
        
        switch (chartType) {
            case 'bar':
                setTempCharts(prevState => ({
                    ...prevState,
                    [title]: !prevState[title]
                }));
                break;
            case 'pie':
                
                setTempPieCharts(prevState => ({
                    ...prevState,
                    [title]: !prevState[title]
                }));
                break;
                case 'radar':
                    setTempRadarCharts(prevState => ({
                    ...prevState,
                    [title]: !prevState[title]
                }));
                break;
                default:
                    break;
                }
                console.log('Temp Pie', tempPieCharts);
    };

    const handleConfirm = () => {
        setSelectedCharts(tempCharts);
        setSelectedPieCharts(tempPieCharts);
        setSelectedRadarCharts(tempRadarCharts);
        handleClose();
    };

    return (
        <div>
            <BarChartInput open={openBar} close={() => setOpenBar(false)} />
            <PieChartInputs open={openPie} close={() => setOpenPie(false)} />
            <RadarChartInput open={openRadar} close={() => setOpenRadar(false)} />

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header style={{ backgroundColor: "#00008B" }}>
                    <Offcanvas.Title className='text-white w-100'>
                        <div className='d-flex justify-between justify-content-between'>
                            <p>Add Widgets</p>
                            <p className='cp'>
                                <IoMdClose onClick={handleClose} />
                            </p>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='position-relative'>
                    <p className='text-xl text-black'>Personalize your Dashboard by adding the following widgets</p>
                    <div>
                        <Tabs defaultActiveKey="bar" id="widget-tabs" className="mb-3">
                            <Tab eventKey="bar" title="Bar Charts">
                                <div>
                                    {charts.length > 0 && (
                                        <div>
                                            {charts.map((e, i) => (
                                                <InputGroup className="mb-3" key={i}>
                                                    <InputGroup.Checkbox
                                                        aria-label="Checkbox for following text input"
                                                        checked={!!tempCharts[e.title]}
                                                        onChange={() => handleCheckboxChange(e.title, 'bar')}
                                                    />
                                                    <Form.Control
                                                        readOnly
                                                        aria-label="Text input with checkbox"
                                                        value={e.title}
                                                    />
                                                </InputGroup>
                                            ))}
                                        </div>
                                    )}
                                    <Button onClick={() => { setOpenBar(true); handleClose(); }} variant="light" className='border pb-2'>
                                        <IoIosAdd size={20} color='gray' /> Add Bar Chart
                                    </Button>
                                </div>
                            </Tab>
                            <Tab eventKey="pie" title="Pie Charts">
                                <div>
                                    {pieCharts.length > 0 && (
                                        <div>
                                            {pieCharts.map((e, i) => (
                                                <InputGroup className="mb-3" key={i}>
                                                    <InputGroup.Checkbox
                                                        aria-label="Checkbox for following text input"
                                                        checked={!!tempPieCharts[e.title]}
                                                        onChange={() => handleCheckboxChange(e.title, 'pie')}
                                                    />
                                                    <Form.Control
                                                        readOnly
                                                        aria-label="Text input with checkbox"
                                                        value={e.title}
                                                    />
                                                </InputGroup>
                                            ))}
                                        </div>
                                    )}
                                    <Button onClick={() => { setOpenPie(true); handleClose(); }} variant="light" className='border pb-2'>
                                        <IoIosAdd size={20} color='gray' /> Add Pie Chart
                                    </Button>
                                </div>
                            </Tab>
                            <Tab eventKey="radar" title="Radar Charts">
                                <div>
                                    {radarCharts.length > 0 && (
                                        <div>
                                            {radarCharts.map((e, i) => (
                                                <InputGroup className="mb-3" key={i}>
                                                    <InputGroup.Checkbox
                                                        aria-label="Checkbox for following text input"
                                                        checked={!!tempRadarCharts[e.title]}
                                                        onChange={() => handleCheckboxChange(e.title, 'radar')}
                                                    />
                                                    <Form.Control
                                                        readOnly
                                                        aria-label="Text input with checkbox"
                                                        value={e.title}
                                                    />
                                                </InputGroup>
                                            ))}
                                        </div>
                                    )}
                                    <Button onClick={() => { setOpenRadar(true); handleClose(); }} variant="light" className='border pb-2'>
                                        <IoIosAdd size={20} color='gray' /> Add Radar Chart
                                    </Button>
                                </div>
                            </Tab>
                        </Tabs>
                        <div className='d-flex gap-2 position-absolute' style={{ right: "20px", bottom: "20px" }}>
                            <Button onClick={handleClose} variant="light" style={{ color: "#00008B", backgroundColor: "transparent", border: "1px solid #00008B" }} className='border pb-2'>
                                Cancel
                            </Button>
                            <Button onClick={handleConfirm} className='border pb-2 text-white' style={{ backgroundColor: "#00008B" }}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default AddWidget;



