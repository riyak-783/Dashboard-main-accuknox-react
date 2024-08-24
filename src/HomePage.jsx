import React, { useState } from 'react'
import PieChart from './PieChart/PieChart'
import BarChart from './BarChart/BarChart'
import RadarChart from './RadarChart/RadarChart'
import AddWidget from './Components/AddWidget'
import { Button } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'


const HomePage = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
           
            <div className='mt-5 pt-5 bg-blue-500 row justify-content-start w-100 mx-auto'>

           
            <AddWidget show={show} handleClose={handleClose} />
            <span className='d-flex align-items-center justify-content-between'>
                <h4 className='head'>CNAPP Dashboard</h4>
                <Button onClick={handleShow}  className=''>
                            Add widget <IoIosAdd size={20} color='white' />
                        </Button>
                </span>

                <h5 className='head mt-3'>CSPM Executive Dashboard (PIE CHART)</h5>
                <div className=' border bg-grey my-2 rounded-4 ms-2' style={{
                    width:'99%'
                }}>
                    <PieChart />
                </div>
            </div>
            <div className='mt-3 row justify-content-start w-100 mx-auto'>
                <h5 className='head'>CWPP Dashboard (BAR CHART)</h5>
                <div className=' border bg-grey my-2 rounded-4 ms-2' style={{width:'99%'}}>
                    <BarChart />
                </div>
            </div>

            <div className='mt-3 row justify-content-start w-100 mx-auto'>
                <h5 className='head'>Registry Scan</h5>
                <div className=' border bg-grey my-2 rounded-4 ms-2' style={{width:'99%'}}>
                    <RadarChart />
                </div>
            </div>
            
        </>
    )
}

export default HomePage
