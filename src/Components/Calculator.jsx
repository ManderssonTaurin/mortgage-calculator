import React, { useState } from "react";
import { TextField, Box, Button, Typography, Divider, Grid, Slider } from "@mui/material";
import { useEffect } from "react";

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

  // Generic handler for input fields
  const handleInputChange = (e, setState) => {
    let value = e.target.value.replace(/\s/g, "").replace(",", ".");
  
    if (value === "") {
      setState(""); // Allow empty input while typing
      return;
    }
  
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setState(numericValue);
    }
  };
  

  // Generic handler for sliders
  const handleSliderChange = (setState) => (event, newValue) => {
    setState(newValue);
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

  const minimumDeposit = parseInt(propertyValue * 0.15, 10);

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={0}>
        {/* Left Column: Input Fields */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1, color: "#000000" }}>Bostadens värde</Typography>
            <TextField
               variant="outlined"
               fullWidth
               sx={{ mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#cbcbcb", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#000000", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000000", // Border color when focused
                  },
                  borderRadius: "8px", // Rounded corners
                  
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000", // Text color
                    fontSize: "16px",
                    fontWeight: 500,
                  },
                }}
               value={propertyValue === "" ? "" : formatNumberWithSpaces(propertyValue)}
               onChange={(e) => handleInputChange(e, setPropertyValue)}
               inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Slider
              value={propertyValue}
              min={100000}
              max={15000000}
              step={10000}
              onChange={handleSliderChange(setPropertyValue)}
              valueLabelDisplay="auto"
              sx={{
                color: "#54d4a0", // Change the color of the slider
                height: 8, // Thickness of the track
                "& .MuiSlider-thumb": {
                  width: 24,
                  height: 24,
                  backgroundColor: "#54d4a0",
                  border: "2px solid #54d4a0",
                  "&:hover": {
                    boxShadow: "0px 0px 0px 8px rgba(37, 126, 215, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  border: "none", // Remove default border
                },
                "& .MuiSlider-rail": {
                  opacity: 1,
                  backgroundColor: "#f0f0f0",
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: "6px",
                  opacity: 0
                },
  
              }}
              
            />
            {/* Minimum Deposit Text */}
            <Typography variant="body2" sx={{ color: "gray", mt: 2 }}>
              Minsta kontantinsats: {formatNumberWithSpaces(minimumDeposit)} kr
            </Typography>

            {/* Deposit */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#000000" }}>Kontantinsats</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#cbcbcb", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#000000", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000000", // Border color when focused
                  },
                  borderRadius: "8px", // Rounded corners
                  
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000", // Text color
                    fontSize: "16px",
                    fontWeight: 500,
                  },
               }}
              value={deposit === "" ? "" : formatNumberWithSpaces(deposit)}
              onChange={(e) => {
                let value = e.target.value.replace(/\s/g, ""); // Remove spaces
            
                if (value === "") {
                  setDeposit(""); // Allow empty input
                  return;
                }
            
                let numericValue = parseFloat(value);
                if (!isNaN(numericValue)) {
                  setDeposit(numericValue);
                }
              }}
              onBlur={() => {
                // Apply min/max constraints when user leaves input field
                setDeposit((prevDeposit) =>
                  Math.max(propertyValue * 0.15, Math.min(prevDeposit, propertyValue))
                );
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Slider
              value={deposit || propertyValue * 0.15} // Ensure valid number
              min={propertyValue * 0.15}
              max={propertyValue}
              step={10000}
              onChange={(_, newValue) => setDeposit(newValue)} // Allow smooth sliding
              onChangeCommitted={() => {
                // Enforce constraints when user releases the slider
                setDeposit((prevDeposit) =>
                  Math.max(propertyValue * 0.15, Math.min(prevDeposit, propertyValue))
                );
              }}
              valueLabelDisplay="auto"
              sx={{
                color: "#54d4a0", // Change the color of the slider
                height: 8, // Thickness of the track
                "& .MuiSlider-thumb": {
                  width: 24,
                  height: 24,
                  backgroundColor: "#54d4a0",
                  border: "2px solid #54d4a0",
                  "&:hover": {
                    boxShadow: "0px 0px 0px 8px rgba(37, 126, 215, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  border: "none", // Remove default border
                },
                "& .MuiSlider-rail": {
                  opacity: 1,
                  backgroundColor: "#f0f0f0",
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: "6px",
                  opacity: 0
                },
  
              }}
            />

            {/* Monthly Income */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#000000" }}>Hushållets totala månadsinkomst</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#cbcbcb", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#000000", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000000", // Border color when focused
                  },
                  borderRadius: "8px", // Rounded corners
                  
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000", // Text color
                    fontSize: "16px",
                    fontWeight: 500,
                  },
               }}
              value={formatNumberWithSpaces(monthlyIncome)}
              onChange={(e) => handleInputChange(e, setMonthlyIncome)}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Slider
              value={monthlyIncome}
              min={0}
              max={300000}
              step={5000}
              onChange={handleSliderChange(setMonthlyIncome)}
              valueLabelDisplay="auto"
              sx={{
                color: "#54d4a0", // Change the color of the slider
                height: 8, // Thickness of the track
                "& .MuiSlider-thumb": {
                  width: 24,
                  height: 24,
                  backgroundColor: "#54d4a0",
                  border: "2px solid #54d4a0",
                  "&:hover": {
                    boxShadow: "0px 0px 0px 8px rgba(37, 126, 215, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  border: "none", // Remove default border
                },
                "& .MuiSlider-rail": {
                  opacity: 1,
                  backgroundColor: "#f0f0f0",
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: "6px",
                  opacity: 0
                },
  
              }}
            />

            {/* Interest Rate */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#000000" }}>Exempelränta (%)</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ 
              mb: 2, 
              "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#cbcbcb", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#000000", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#000000", // Border color when focused
              },
              borderRadius: "8px", // Rounded corners
              
              },
              "& .MuiInputBase-input": {
                color: "#000000", // Text color
                fontSize: "16px",
                fontWeight: 500,
              },

              }}
              value={interest}
              onChange={(e) => {
                let value = e.target.value.replace(/\s/g, "").replace(",", "."); // Remove spaces & convert ',' to '.'
                
                // Allow empty input so users can type numbers manually
                if (value === "") {
                  setInterest("");
                  return;
                }

                // Validate decimal input
                if (/^\d*\.?\d*$/.test(value)) { // Allows "3", "3.", "3.4"
                  setInterest(value);
                }
              }}
              inputProps={{ inputMode: "decimal", pattern: "[0-9]+([,\\.][0-9]+)?" }}
            />

            <Slider
              value={parseFloat(interest) || 0} // Ensure a valid number for the slider
              min={0.5}
              max={10}
              step={0.01}
              onChange={(_, newValue) => setInterest(newValue.toString())} // Convert back to string
              valueLabelDisplay="auto"
              sx={{
                color: "#54d4a0", // Change the color of the slider
                height: 8, // Thickness of the track
                "& .MuiSlider-thumb": {
                  width: 24,
                  height: 24,
                  backgroundColor: "#54d4a0",
                  border: "2px solid #54d4a0",
                  "&:hover": {
                    boxShadow: "0px 0px 0px 8px rgba(37, 126, 215, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  border: "none", // Remove default border
                },
                "& .MuiSlider-rail": {
                  opacity: 1,
                  backgroundColor: "#f0f0f0",
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: "6px",
                  opacity: 0
                },
  
              }}
            />

            {/* Calculate Button */}
            <Button variant="contained" 
            sx={{ mt: 3, backgroundColor: "#000000", color: "#ffffff"

             }} onClick={calculateAmortizationAndInterest}>
              Beräkna
            </Button>
          </Box>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mt: 3, 
            mx: { xs: 0, md: 2 },
            borderColor: "grey.400",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Right Column: Results */}
        <Grid item xs={12} md={5}>
          {(monthlyInterest !== null && monthlyAmortization !== null && amortizationRate !==null ) ? (
            <Box>
              <Box sx={{backgroundColor: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center", 
                flexDirection:"column", paddingBottom: 2, mt: { xs: 2, md: 0 }, }}>
                <Typography variant="h5" sx={{ mt: 1, color: "#000000"}}>Total månatlig kostnad</Typography>
                <Typography variant="h4"sx={{color: "#54d4a0"}} >{formatNumberWithSpaces(totalCost)} kr</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" }, 
                  gap: 2, 
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ececec",
                    padding: 2,
                    borderRadius: "8px",
                    width: { xs: "100%", md: "48%" }, 
                    textAlign: "center", 
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#000000" }}>Månatlig ränta</Typography>
                  <Typography variant="h5" sx={{ color: "#000000" }}>{formatNumberWithSpaces(monthlyInterest)} kr</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgb(233, 255, 246)",
                    padding: 2,
                    mb: { xs: 2, md: 0 }, 
                    borderRadius: "8px",
                    width: { xs: "100%", md: "68%" }, // Full width on small screens, 48% on larger screens
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#000000" }}>Månatlig {amortizationRate}% amortering</Typography>
                  <Typography variant="h5" sx={{ color: "#000000"}}>{formatNumberWithSpaces(monthlyAmortization)} kr</Typography>
                </Box>
              </Box>
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
