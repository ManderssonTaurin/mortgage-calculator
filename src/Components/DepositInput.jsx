import { TextField, Typography, Slider, Box } from "@mui/material";
import { useState, useEffect } from "react";

const DepositInput = ({ deposit, setDeposit, propertyValue, formatNumberWithSpaces }) => {
    const minDeposit = propertyValue * 0.15;
    const [inputValue, setInputValue] = useState(formatNumberWithSpaces(deposit));

    // **Update deposit when propertyValue changes**
    useEffect(() => {
        if (deposit < minDeposit || deposit > propertyValue) {
            setDeposit(minDeposit);
            setInputValue(formatNumberWithSpaces(minDeposit)); // Keep UI synced
        }
    }, [propertyValue]); // Runs whenever propertyValue changes

    const handleDepositChange = (e) => {
        let value = e.target.value.replace(/\s/g, ""); // Remove spaces

        if (value === "") {
            setInputValue(""); // Allow user to clear input temporarily
            return;
        }

        if (/^\d+$/.test(value)) { // Only allow numbers
            setInputValue(formatNumberWithSpaces(value)); // Update input field
            setDeposit(Number(value)); // Update deposit state instantly
        }
    };

    const handleDepositBlur = () => {
        let numericValue = parseFloat(inputValue.replace(/\s/g, "")); // Convert to number

        if (isNaN(numericValue) || numericValue < minDeposit) {
            numericValue = minDeposit; // Enforce minimum deposit
        } else if (numericValue > propertyValue) {
            numericValue = propertyValue; // Prevent deposit from exceeding property value
        }

        setDeposit(numericValue); // Update global deposit state
        setInputValue(formatNumberWithSpaces(numericValue)); // Format input after blur
    };

    return ( 
        <Box>
            <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#000000" }}>
                Kontantinsats
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                value={inputValue}
                onChange={handleDepositChange}
                onBlur={handleDepositBlur}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#cbcbcb" },
                        "&:hover fieldset": { borderColor: "#000000" },
                        "&.Mui-focused fieldset": { borderColor: "#000000" },
                        borderRadius: "8px",
                    },
                    "& .MuiInputBase-input": {
                        color: "#000000",
                        fontSize: "16px",
                        fontWeight: 500,
                    },
                }}
            />
            <Slider
                value={deposit}
                min={minDeposit}
                max={propertyValue}
                step={10000}
                onChange={(_, newValue) => {
                    setDeposit(newValue);
                    setInputValue(formatNumberWithSpaces(newValue)); // Ensure input updates instantly
                }}
                valueLabelDisplay="auto"
                sx={{
                    color: "#54d4a0",
                    height: 8,
                    "& .MuiSlider-thumb": {
                        width: 24,
                        height: 24,
                        backgroundColor: "#54d4a0",
                        border: "2px solid #54d4a0",
                        "&:hover": { boxShadow: "0px 0px 0px 8px rgba(37, 126, 215, 0.16)" },
                    },
                    "& .MuiSlider-track": { border: "none" },
                    "& .MuiSlider-rail": { opacity: 1, backgroundColor: "#f0f0f0" },
                }}
            />
        </Box>
    );
};

export default DepositInput;
