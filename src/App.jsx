import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import Calculator from './Components/Calculator'
import { Box, Typography, Container } from "@mui/material";
import './App.css'

function App() {
  

  return (
    <div>
      <Navbar/>
      <Container>
        <Calculator/>
      </Container>

      
      


    </div>
      
    
  )
}

export default App
