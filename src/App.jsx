import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import Calculator from './Components/Calculator'
import { Box, Typography, Container } from "@mui/material";
import './App.css'


function App() {
  

  return (
    <Box
    sx={{
      backgroundColor: "#f3f3f3"
    }}
    >
      {/* <Navbar/> */}
      <Container  >
        <Box
        sx={{ 
          py: 5,
          px: 0,
          width: "100%",
        }}
        >
        <Typography variant="h1" 
        sx={{
          typography: { xs: "h4", sm: "h1"},
          m: 0 
        }}
        >
          Räkna på lånelöfte
        </Typography>
        </Box>
        <Calculator/>
      </Container>

      
      


    </Box>
      
    
  )
}

export default App
