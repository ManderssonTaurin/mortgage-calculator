import React, { useState } from "react";
import { TextField, Box, Button, Typography, Divider, Grid, Slider } from "@mui/material";

const Calculator = () => {
  // Initial states
  const [propertyValue, setPropertyValue] = useState(2000000);
  const [deposit, setDeposit] = useState(300000);
  const [monthlyIncome, setMonthlyIncome] = useState(70000);
  const [interest, setInterest] = useState(3.4);
  const [monthlyInterest, setMonthlyInterest] = useState(null);
  const [monthlyAmortization, setMonthlyAmortization] = useState(null);

  // Function to format numbers with spaces
  const formatNumberWithSpaces = (value) => {
    return Number(value)
      .toFixed(0) // Ensure whole number format
      .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add spaces for thousands
  };

  // Generic handler for input fields
  const handleInputChange = (e, setState) => {
    const numericValue = parseFloat(e.target.value.replace(/\s/g, "").replace(",", "."));
    if (!isNaN(numericValue)) {
      setState(numericValue);
    }
  };

  // Generic handler for sliders
  const handleSliderChange = (setState) => (event, newValue) => {
    setState(newValue);
  };

  // Calculate amortization and interest
  const calculateAmortizationAndInterest = () => {
    console.log("Calculating amortization and interest...");

    const loanAmount = propertyValue - deposit;
    const annualIncome = monthlyIncome * 12;
    const debtToIncomeRatio = loanAmount / annualIncome;
    console.log("Loan Amount:", loanAmount);
    console.log("Annual Income:", annualIncome);
    console.log("Debt-to-Income Ratio:", debtToIncomeRatio);

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

    console.log("LTV:", ltv);
    console.log("Annual Amortization Rate:", annualAmortizationRate);

    const monthlyInterestValue = (loanAmount * (interest / 100)) / 12;
    const monthlyAmortizationValue = (loanAmount * annualAmortizationRate) / 12;

    console.log("Monthly Interest Value:", monthlyInterestValue);
    console.log("Monthly Amortization Value:", monthlyAmortizationValue);

    // Check for invalid values before updating state
    if (!isNaN(monthlyInterestValue) && !isNaN(monthlyAmortizationValue)) {
      setMonthlyInterest(monthlyInterestValue.toFixed(0));
      setMonthlyAmortization(monthlyAmortizationValue.toFixed(0));
    } else {
      setMonthlyInterest(null);
      setMonthlyAmortization(null);
    }
  };

  const minimumDeposit = parseInt(propertyValue * 0.15, 10);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Left Column: Input Fields */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>Bostadens värde</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formatNumberWithSpaces(propertyValue)}
              onChange={(e) => handleInputChange(e, setPropertyValue)}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Slider
              value={propertyValue}
              min={500000}
              max={15000000}
              step={10000}
              onChange={handleSliderChange(setPropertyValue)}
              valueLabelDisplay="auto"
            />
            {/* Minimum Deposit Text */}
            <Typography variant="body2" sx={{ color: "gray", mt: 2 }}>
              Minsta kontantinsats: {formatNumberWithSpaces(minimumDeposit)} kr
            </Typography>

            {/* Deposit */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Kontantinsats</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formatNumberWithSpaces(deposit)}
              onChange={(e) => handleInputChange(e, setDeposit)}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Slider
              value={deposit}
              min={50000}
              max={propertyValue}
              step={10000}
              onChange={handleSliderChange(setDeposit)}
              valueLabelDisplay="auto"
            />

            {/* Monthly Income */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Hushållets totala månadsinkomst</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formatNumberWithSpaces(monthlyIncome)}
              onChange={(e) => handleInputChange(e, setMonthlyIncome)}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Slider
              value={monthlyIncome}
              min={10000}
              max={300000}
              step={5000}
              onChange={handleSliderChange(setMonthlyIncome)}
              valueLabelDisplay="auto"
            />

            {/* Interest Rate */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Exempelränta (%)</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={interest}
              onChange={(e) => handleInputChange(e, setInterest)}
              inputProps={{ inputMode: "decimal", pattern: "[0-9]+([,\\.][0-9]+)?" }}
            />
            <Slider
              value={interest}
              min={0.5}
              max={10}
              step={0.01}
              onChange={handleSliderChange(setInterest)}
              valueLabelDisplay="auto"
            />

            {/* Calculate Button */}
            <Button variant="contained" sx={{ mt: 3 }} onClick={calculateAmortizationAndInterest}>
              Beräkna
            </Button>
          </Box>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mx: { xs: 0, md: 2 },
            borderColor: "grey.400",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Right Column: Results */}
        <Grid item xs={12} md={5}>
          {(monthlyInterest !== null && monthlyAmortization !== null) ? (
            <Box>
              <Typography variant="h6" sx={{ mt: 5 }}>Månatlig ränta:</Typography>
              <Typography variant="body1">{formatNumberWithSpaces(monthlyInterest)} kr</Typography>

              <Typography variant="h6" sx={{ mt: 3 }}>Månatlig amortering:</Typography>
              <Typography variant="body1">{formatNumberWithSpaces(monthlyAmortization)} kr</Typography>
            </Box>
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
