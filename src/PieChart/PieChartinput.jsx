import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { ReactProvider } from '../Context/ReactContent';

const PieChartInputs = ({ open, close }) => {
    const { pieCharts, setPieCharts, pieLabels, setPieLabels, pieValues, setPieValues, pieTitle, setPieTitle, setSelectedPieCharts } = useContext(ReactProvider);

    const handleSubmit = (e) => {
        e.preventDefault();
        const labelsArray = pieLabels?.split(',').map(label => label.trim());
        const valuesArray = pieValues?.split(',').map(value => parseFloat(value.trim()));

        if (labelsArray.length !== valuesArray.length) {
            alert("Labels and Values must have the same length.");
            return;
        }

        const newPieChart = {
            title: pieTitle,
            data: labelsArray.map((label, index) => ({ label, value: valuesArray[index] }))
        };

        setPieCharts([...pieCharts, newPieChart]);

        setSelectedPieCharts(prevSelected => ({
            ...prevSelected,
            [newPieChart.title]: true,
        }));

        // Clear the form
        setPieTitle('');
        setPieLabels('');
        setPieValues('');
        close();
    };

    const handleDelete = (chartTitle) => {
        setPieCharts(pieCharts.filter(chart => chart.title !== chartTitle));
        setSelectedPieCharts(prevSelected => {
            const newSelected = { ...prevSelected };
            delete newSelected[chartTitle];
            return newSelected;
        });
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Add Pie Chart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className='font-semibold text-xl'>
                    <h6 className='text-center font-bold text-xl'>Add New Pie Chart</h6>
                    <div>
                        <label>Title</label>
                        <br />
                        <input className='form_inputs'
                            type="text"
                            value={pieTitle}
                            onChange={(e) => setPieTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Labels (comma separated)</label>
                        <br />
                        <input className='form_inputs'
                            type="text"
                            value={pieLabels}
                            onChange={(e) => setPieLabels(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Values (comma separated) </label>
                        <br />
                        <input className='form_inputs'
                            type="text"
                            value={pieValues}
                            onChange={(e) => setPieValues(e.target.value)}
                            required
                        />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className='text-center border border-2-blue py-1 px-2 rounded'>Add Pie Chart</button>
                    </div>
                </form>

                <hr />

                <h6 className='text-center'>Current Pie Charts</h6>
                {pieCharts.map((pieChart) => (
                    <div key={pieChart.title} className='d-flex justify-content-between align-items-center'>
                        <span>{pieChart.title}</span>
                        <button 
                            onClick={() => handleDelete(pieChart.title)} 
                            className='btn btn-danger btn-sm bg-red-500'
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
};

export default PieChartInputs;
