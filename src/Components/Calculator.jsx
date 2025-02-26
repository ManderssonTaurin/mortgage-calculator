import React, { useState } from "react";
import { TextField, Box, Button, Typography, Divider, Grid, Slider, Paper } from "@mui/material";
import { useEffect } from "react";
import PropertyValueInput from "./PropertyValueInput";
import DepositInput from "./DepositInput";
import IncomeInput from "./IncomeInput";
import InterestInput from "./InterestInput";
import Results from "./Results";


const Calculator = () => {
  
  const [propertyValue, setPropertyValue] = useState(2000000);
  const [deposit, setDeposit] = useState(300000);
  const [monthlyIncome, setMonthlyIncome] = useState(20000);
  const [interest, setInterest] = useState(3.4);
  const [monthlyInterest, setMonthlyInterest] = useState(null);
  const [monthlyAmortization, setMonthlyAmortization] = useState(null);
  const [amortizationRate, setAmortizationRate] = useState(null); 
  const [totalCost, setTotalCost] = useState(null)

  // Function to format numbers with spaces
  const formatNumberWithSpaces = (value) => {
    return Number(value)
      .toFixed(0) // Ensure whole number format
      .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add spaces for thousands
  };




// minimumDeposit = edge case when bostadens värde becomes less than kontantinsatsen 

useEffect(() => {
  const minDeposit = propertyValue * 0.15;
  
  // Adjust deposit only if it's outside valid bounds
  if (deposit < minDeposit || deposit > propertyValue) {
    setDeposit((prevDeposit) => Math.max(minDeposit, Math.min(prevDeposit, propertyValue)));
  }
}, [propertyValue, deposit]); // Runs when either value changes

  // Calculate amortization and interest
  const calculateAmortizationAndInterest = () => {
    console.log("Calculating amortization and interest...");

    const loanAmount = propertyValue - deposit;
    const annualIncome = monthlyIncome * 12;
    const debtToIncomeRatio = loanAmount / annualIncome;
  
    const ltv = loanAmount / propertyValue;
    let annualAmortizationRate = 0;

    if (ltv > 0.7) {
      annualAmortizationRate = 0.02;
    } else if (ltv > 0.5) {
      annualAmortizationRate = 0.01;
    }

    if (debtToIncomeRatio > 4.5) {
      annualAmortizationRate += 0.01;
    }


    const monthlyInterestValue = (loanAmount * (interest / 100)) / 12;
    const monthlyAmortizationValue = (loanAmount * annualAmortizationRate) / 12;


   

    // Check for invalid values before updating state
    if (!isNaN(monthlyInterestValue) && !isNaN(monthlyAmortizationValue)) {
      setMonthlyInterest(monthlyInterestValue.toFixed(0));
      setMonthlyAmortization(monthlyAmortizationValue.toFixed(0));
      setAmortizationRate((annualAmortizationRate * 100).toFixed(0)); // Convert to percentage
    
    // Calculate Total Monthly Cost**
    const totalMonthlyCost = monthlyInterestValue + monthlyAmortizationValue;
    setTotalCost(totalMonthlyCost.toFixed(0));
  } else {
    setMonthlyInterest(null);
    setMonthlyAmortization(null);
    setTotalCost(null);
  }
    
  };

 

  return (
    <Box sx={{ mt: 2, 
      mb: 4,
    }}
    >

        {/* Right Column: Results */}
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Paper
            elevation={8}
            sx={{
              p: 3, 
              borderRadius: "12px"
            }}
            >
              <PropertyValueInput 
              propertyValue={propertyValue} 
              setPropertyValue={setPropertyValue} 
              formatNumberWithSpaces={formatNumberWithSpaces} 
              minimumDeposit={propertyValue * 0.15} 
              />
              <DepositInput deposit={deposit} setDeposit={setDeposit} propertyValue={propertyValue} formatNumberWithSpaces={formatNumberWithSpaces} />
              <IncomeInput monthlyIncome={monthlyIncome} setMonthlyIncome={setMonthlyIncome} formatNumberWithSpaces={formatNumberWithSpaces} />
              <InterestInput interest={interest} setInterest={setInterest} />
              <Button variant="contained" sx={{ mt: 3, backgroundColor: "#000000", color: "#ffffff" }} onClick={calculateAmortizationAndInterest}>
                Beräkna
              </Button>
            </Paper>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: "grey.400", display: { xs: "none", md: "block" } }} />
          <Grid item xs={12} md={5}>
            {monthlyInterest !== null && monthlyAmortization !== null && amortizationRate !== null ? (
              <Results totalCost={totalCost} monthlyInterest={monthlyInterest} monthlyAmortization={monthlyAmortization} amortizationRate={amortizationRate} formatNumberWithSpaces={formatNumberWithSpaces} />
            ) : (
              <Typography variant="body1" sx={{ mt: 5, color: "gray" }}>
                Fyll i alla fält och tryck på "Beräkna" för att se resultat.
              </Typography>
            )}
          </Grid>
        </Grid>
    </Box>
  );
};

export default Calculator;
