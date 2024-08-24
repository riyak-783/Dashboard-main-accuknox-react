import React from 'react'
import './index.css';
import Context from './Context/ReactContent'
import Navbar from './Components/Navbar'
import HomePage from './HomePage'
const App = () => {
  return (
    <Context>
      <Navbar/>
     <HomePage />
    </Context>
  )
}

export default App;
