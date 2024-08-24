
import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { ReactProvider } from '../Context/ReactContent';

const RadarChartInput = ({ open, close }) => {
    const { radarCharts, setRadarCharts, radarTitle, setRadarTitle, radarValues, setRadarValues, setSelectedRadarCharts } = useContext(ReactProvider);

    const handleSubmit = (e) => {
        e.preventDefault();

        const radarArray = radarValues.split(',').map(value => parseFloat(value.trim()));

        const newRadarChart = {
            title: radarTitle,
            data: radarArray
        };

        setRadarCharts([...radarCharts, newRadarChart]);

        setSelectedRadarCharts(prevSelected => ({
            ...prevSelected,
            [newRadarChart.title]: true,
        }));

        // Clear the form
        setRadarTitle('');
        setRadarValues('');
        close();
    };

    const handleDelete = (chartTitle) => {
        setRadarCharts(radarCharts.filter(chart => chart.title !== chartTitle));
        setSelectedRadarCharts(prevSelected => {
            const newSelected = { ...prevSelected };
            delete newSelected[chartTitle];
            return newSelected;
        });
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Add Radar Chart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <h6 className='text-center'>Add New Radar Chart</h6>
                    <div>
                        <label>Title </label>
                        <br />
                        <input className='form_inputs'
                            type="text"
                            value={radarTitle}
                            onChange={(e) => setRadarTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Values (comma separated)</label>
                        <br />
                        <input className='form_inputs'
                            type="text"
                            value={radarValues}
                            onChange={(e) => setRadarValues(e.target.value)}
                            required
                        />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className='text-center py-1 px-2 rounded'>Add Chart</button>
                    </div>
                </form>

                <hr />

                <h6 className='text-center'>Current Charts</h6>
                {radarCharts.map((radarChart) => (
                    <div key={radarChart.title} className='d-flex justify-content-between align-items-center'>
                        <span>{radarChart.title}</span>
                        <button 
                            onClick={() => handleDelete(radarChart.title)} 
                            className='btn btn-danger btn-sm bg-red-500'
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
}

export default RadarChartInput;

