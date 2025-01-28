import React, { useState } from "react";
import { TextField, Box, Button, Typography, Divider, Grid } from "@mui/material";

const Calculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [deposit, setDeposit] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [interest, setInterest] = useState("");
  const [monthlyInterest, setMonthlyInterest] = useState(null);
  const [monthlyAmortization, setMonthlyAmortization] = useState(null);

  const formatNumberWithSpaces = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  };

  const handleInputChange = (e, setState) => {
    const formattedValue = formatNumberWithSpaces(e.target.value);
    setState(formattedValue);
  };

  const calculateMinimumDeposit = () => {
    const numericPropertyValue = parseInt(propertyValue.replace(/\s/g, ""), 10);
    if (!isNaN(numericPropertyValue)) {
      return parseInt(numericPropertyValue * 0.15, 10); // Ensure it's a number
    }
    return null;
  };

  const calculateAmortizationAndInterest = () => {
    const numericPropertyValue = parseInt(propertyValue.replace(/\s/g, ""), 10);
    const numericDeposit = parseInt(deposit.replace(/\s/g, ""), 10);
    const numericInterest = parseFloat(interest);
    const numericMonthlyIncome = parseInt(monthlyIncome.replace(/\s/g, ""), 10);

    if (
      isNaN(numericPropertyValue) ||
      isNaN(numericDeposit) ||
      isNaN(numericInterest) ||
      isNaN(numericMonthlyIncome)
    ) {
      setMonthlyInterest(null);
      setMonthlyAmortization(null);
      return;
    }

    const loanAmount = numericPropertyValue - numericDeposit;
    const annualIncome = numericMonthlyIncome * 12;
    const debtToIncomeRatio = loanAmount / annualIncome;

    const ltv = loanAmount / numericPropertyValue;
    let annualAmortizationRate = 0;

    if (ltv > 0.7) {
      annualAmortizationRate = 0.02;
    } else if (ltv > 0.5) {
      annualAmortizationRate = 0.01;
    }

    if (debtToIncomeRatio > 4.5) {
      annualAmortizationRate += 0.01;
    }

    const monthlyInterestValue = (loanAmount * (numericInterest / 100)) / 12;
    const monthlyAmortizationValue = (loanAmount * annualAmortizationRate) / 12;

    setMonthlyInterest(monthlyInterestValue.toFixed(2));
    setMonthlyAmortization(monthlyAmortizationValue.toFixed(2));
  };

  const minimumDeposit = calculateMinimumDeposit();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        {/* Left Column: Input Fields */}
        <Grid item xs={6}>
          <Box>
            <TextField
              label="Bostadens värde"
              variant="outlined"
              fullWidth
              sx={{ mb: 5, mt: 5 }}
              value={propertyValue}
              onChange={(e) => handleInputChange(e, setPropertyValue)}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
            {minimumDeposit && (
              <Typography variant="body2" sx={{ color: "gray", mb: 5 }}>
                Minsta kontantinsats:{" "}
                {formatNumberWithSpaces(minimumDeposit.toString())} kr
              </Typography>
            )}
            <TextField
              label="Kontantinsats"
              variant="outlined"
              fullWidth
              sx={{ mb: 5 }}
              value={deposit}
              onChange={(e) => handleInputChange(e, setDeposit)}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
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
              label="Exempelränta (%)"
              variant="outlined"
              fullWidth
              sx={{ mb: 5 }}
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={calculateAmortizationAndInterest}
            >
              Beräkna
            </Button>
          </Box>
        </Grid>

        {/* Vertical Divider */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, borderColor: "grey.400" }}
        />

        {/* Right Column: Results */}
        <Grid item xs={5}>
          {monthlyInterest !== null && monthlyAmortization !== null && (
            <Box>
              <Typography variant="h6" sx={{ mt: 5 }}>
                Månatlig ränta:
              </Typography>
              <Typography variant="body1">
                {monthlyInterest
                  ? formatNumberWithSpaces(monthlyInterest)
                  : "N/A"}{" "}
                kr
              </Typography>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Månatlig amortering:
              </Typography>
              <Typography variant="body1">
                {monthlyAmortization
                  ? formatNumberWithSpaces(monthlyAmortization)
                  : "N/A"}{" "}
                kr
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;
