import React, { createContext, useState } from "react";

export const ReactProvider = createContext()

const Context = ({ children }) => {

    //------------ bar chart----------
    const [charts, setCharts] = useState([]);
    const [title, setTitle] = useState('');
    const [xValues, setXValues] = useState('');
    const [yValues, setYValues] = useState('');
    const [selectedCharts, setSelectedCharts] = useState({});


    //--------------- Pie Chat-----------------
    const [pieCharts, setPieCharts] = useState([]);
    const [pieTitle, setPieTitle] = useState('');
    const [pieValues, setPieValues] = useState('');
    const [pieLabels, setPieLabels] = useState('');
    const [selectedPieCharts, setSelectedPieCharts] = useState({});


    //--------------- RadarChart Chat-----------------
    const [radarCharts, setRadarCharts] = useState([]);
    const [radarTitle, setRadarTitle] = useState('');
    const [radarValues, setRadarValues] = useState('');
    const [selectedRadarCharts, setSelectedRadarCharts] = useState({});


    const value = {

        //----------- Bar Charts --------------
        charts, setCharts,
        yValues, setYValues,
        xValues, setXValues,
        title, setTitle,
        selectedCharts, setSelectedCharts

        //------------ Pie Charts ---------------
        , pieCharts, setPieCharts,
        pieValues, setPieValues,
        pieTitle, setPieTitle,
        pieLabels, setPieLabels,
        selectedPieCharts, setSelectedPieCharts,
        
        //------------ Radar Charts ---------------
        radarCharts, setRadarCharts,
        radarTitle, setRadarTitle,
        radarValues, setRadarValues,
        selectedRadarCharts, setSelectedRadarCharts
    }

    return (
        <ReactProvider.Provider value={value}>
            {children}
        </ReactProvider.Provider>
    )
}

export default Context;