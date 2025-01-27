import React, { useState } from "react";
import { TextField, Box, Button, Typography } from "@mui/material";

const Calculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [deposit, setDeposit] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [interest, setInterest] = useState("");
  

  // Function to handle number input and add spaces
  const formatNumberWithSpaces = (value) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Add spaces every 3 digits
    return numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  };

  const handleInputChange = (e, setState) => {
    const formattedValue = formatNumberWithSpaces(e.target.value);
    setState(formattedValue);
  };

  // Calculate the minimum deposit (15% of property value)
  const calcilateMinimumDeposit = () => {
    // Remove spaces to get the raw numeric value
    const numericPropertyValue = parseInt(propertyValue.replace(/\s/g, ""), 10);
    if (!isNaN(numericPropertyValue)) {
      return (numericPropertyValue * 0.15).toFixed(0); // Minimum deposit as an integer
    }
    return null; // if propertyValue is invalid then null is returned 
  }

  const minimumDeposit = calcilateMinimumDeposit();
  


  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Bostadens värde"
        variant="outlined"
        fullWidth
        sx={{ mb: 5, mt: 5 }}
        value={propertyValue}
        onChange={(e) => handleInputChange(e, setPropertyValue)}
        inputProps={{
          inputMode: "numeric", // For better mobile input experience
          pattern: "[0-9]*", // Only allow numbers
        }}
        
      />
       {
        minimumDeposit && (
          <Typography
          variant="body2" sx={{color: "gray", mb: 5}}
          >
            Minsta kontantinsats: {minimumDeposit} kr
          </Typography>
        )

       }
      <TextField
      label="Kontantinsats"
      variant="outlined"
      fullWidth
      sx={{
        mb:5,
      }}
      value={deposit}
      onChange={(e)=> handleInputChange(e, setDeposit)}

      inputProps={{
      inputMode: "numeric", // For better mobile input experience
      pattern: "[0-9]*", // Only allow numbers
      }}
      />
      <TextField
        label="Hushållets totala månadsinkomst"
        variant="outlined"
        fullWidth
        sx={{ mb: 5 }}
        value={monthlyIncome}
        onChange={(e) => handleInputChange(e, setMonthlyIncome)}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
      />
      <TextField
        label="Exempelränta"
        variant="outlined"
        fullWidth
        sx={{ mb: 5 }}
        value={interest}
        onChange={(e) => handleInputChange(e, setInterest)}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
      />
      
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => console.log("Calculate")}
        
      >
        Beräkna
      </Button>
    </Box>
  );
};

export default Calculator;
