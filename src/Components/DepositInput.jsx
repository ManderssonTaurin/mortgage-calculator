import { TextField, Typography, Slider, Box } from "@mui/material";
import { useState } from "react";

const DepositInput = ({ deposit, setDeposit, propertyValue, formatNumberWithSpaces }) => {
    const minDeposit = propertyValue * 0.15;
    const [inputValue, setInputValue] = useState(formatNumberWithSpaces(deposit)); // Keep raw input as a string

    const handleDepositChange = (e) => {
        let value = e.target.value.replace(/\s/g, ""); // Remove existing spaces

        if (value === "") {
            setInputValue(""); // Allow user to clear input temporarily
            return;
        }

        if (/^\d+$/.test(value)) { // Ensure only numbers
            setInputValue(formatNumberWithSpaces(value)); // Apply formatting immediately
        }
    };

    const handleDepositBlur = () => {
        let numericValue = parseFloat(inputValue.replace(/\s/g, "")); // Convert input to a number

        if (isNaN(numericValue) || numericValue < minDeposit) {
            numericValue = minDeposit; // Set minimum value if too low
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
                onBlur={handleDepositBlur} // Validate input when user exits field
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                sx={{ mb: 2,
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
                    setInputValue(formatNumberWithSpaces(newValue)); // Update input field when using slider
                    // function för att ändra värden utan att klicka på knappen! 
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
                    "& .MuiSlider-valueLabel": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        borderRadius: "6px",
                        opacity: 0,
                    },
                }}
            />
        </Box>
    );
};

export default DepositInput;
