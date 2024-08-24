import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { ReactProvider } from '../Context/ReactContent';

const BarChartInput = ({ open, close }) => {
    const { charts, setCharts, yValues, setYValues, xValues, setXValues, title, setTitle, setSelectedCharts } = useContext(ReactProvider);

    const handleSubmit = (e) => {
        e.preventDefault();

        const xArray = xValues.split(',').map(x => x.trim());
        const yArray = yValues.split(',').map(y => parseFloat(y.trim()));

        if (xArray.length !== yArray.length) {
            alert("X and Y values must have the same length.");
            return;
        }

        const newChart = {
            title,
            data: xArray.map((x, index) => ({ x, y: yArray[index] }))
        };

        setCharts([...charts, newChart]);

        setSelectedCharts(prevSelected => ({
            ...prevSelected,
            [newChart.title]: true,
        }));

        // Clear the form
        setTitle('');
        setXValues('');
        setYValues('');
        close();
    };

    const handleDelete = (chartTitle) => {
        setCharts(charts.filter(chart => chart.title !== chartTitle));
        setSelectedCharts(prevSelected => {
            const newSelected = { ...prevSelected };
            delete newSelected[chartTitle];
            return newSelected;
        });
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>CSPM</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <h6 className='text-center'>Add New Bar Chart</h6>
                    <div>
                        <label>Title</label>
                        <br />
                        <input className='form_inputs'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>X Values (comma separated)</label>
                        <br />
                        <input className='form_inputs'
                            type="text"
                            value={xValues}
                            onChange={(e) => setXValues(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Y Values (comma separated) </label>
                        <br />
                        <input className='form_inputs'
                            type="text"
                            value={yValues}
                            onChange={(e) => setYValues(e.target.value)}
                            required
                        />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className='text-center py-1 px-2 rounded'>Add Chart</button>
                    </div>
                </form>

                <hr />

                <h6 className='text-center'>Current Charts</h6>
                {charts.map((chart) => (
                    <div key={chart.title} className='d-flex justify-content-between align-items-center'>
                        <span>{chart.title}</span>
                        <button 
                            onClick={() => handleDelete(chart.title)} 
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

export default BarChartInput;


