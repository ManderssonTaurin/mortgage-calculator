import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid, Paper } from "@mui/material";
import PropertyValueInput from "./PropertyValueInput";
import DepositInput from "./DepositInput";
import IncomeInput from "./IncomeInput";
import InterestInput from "./InterestInput";
import Results from "./Results";
import Contact from "./Contact";
// import "./Calculator.css"

const Calculator = () => {
  const [propertyValue, setPropertyValue] = useState(0);
  const [deposit, setDeposit] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [interest, setInterest] = useState(3.4);
  const [monthlyInterest, setMonthlyInterest] = useState(null);
  const [monthlyAmortization, setMonthlyAmortization] = useState(null);
  const [amortizationRate, setAmortizationRate] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  // Function to format numbers with spaces
  const formatNumberWithSpaces = (value) => {
    return Number(value)
      .toFixed(0) // Ensure whole number format
      .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add spaces for thousands
  };

  // Ensure deposit is valid
  useEffect(() => {
    const minDeposit = propertyValue * 0.15;
    if (deposit < minDeposit || deposit > propertyValue) {
      setDeposit(Math.max(minDeposit, Math.min(deposit, propertyValue)));
    }
  }, [propertyValue, deposit]);

  // Recalculate values whenever inputs change
  useEffect(() => {
    const calculateAmortizationAndInterest = () => {
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

      if (!isNaN(monthlyInterestValue) && !isNaN(monthlyAmortizationValue)) {
        setMonthlyInterest(monthlyInterestValue.toFixed(0));
        setMonthlyAmortization(monthlyAmortizationValue.toFixed(0));
        setAmortizationRate((annualAmortizationRate * 100).toFixed(0));
        setTotalCost((monthlyInterestValue + monthlyAmortizationValue).toFixed(0));
      } else {
        setMonthlyInterest(null);
        setMonthlyAmortization(null);
        setTotalCost(null);
      }
    };

    calculateAmortizationAndInterest();
  }, [propertyValue, deposit, monthlyIncome, interest]); // Runs when any input changes

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: "12px" }}>
            <PropertyValueInput
              propertyValue={propertyValue}
              setPropertyValue={setPropertyValue}
              formatNumberWithSpaces={formatNumberWithSpaces}
              minimumDeposit={propertyValue * 0.15}
            />
            <DepositInput
              deposit={deposit}
              setDeposit={setDeposit}
              propertyValue={propertyValue}
              formatNumberWithSpaces={formatNumberWithSpaces}
            />
            <IncomeInput
              monthlyIncome={monthlyIncome}
              setMonthlyIncome={setMonthlyIncome}
              formatNumberWithSpaces={formatNumberWithSpaces}
            />
            <InterestInput interest={interest} setInterest={setInterest} />
          </Paper>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 4, borderColor: "grey.400", display: { xs: "none", md: "block" } }}
        />
        <Grid 
          item 
          xs={12} 
          md={5} 
          sx={{ 
            display: "flex", 
            flexDirection: "column",
            alignItems: "flex-start", 
            justifyContent: "flex-start", 
            minHeight: 0,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", minHeight: 0, }}>
            <Results
              totalCost={totalCost}
              monthlyInterest={monthlyInterest}
              monthlyAmortization={monthlyAmortization}
              amortizationRate={amortizationRate}
              formatNumberWithSpaces={formatNumberWithSpaces}

            />
            {/* <Box sx={{ mt: 2 }}> 
              Hello!
            </Box> */}
          </Box> 
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;