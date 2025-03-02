import { TextField, Typography, Slider, Box } from "@mui/material";
import { useState, useEffect } from "react";

const IncomeInput = ({ monthlyIncome, setMonthlyIncome, formatNumberWithSpaces }) => {
    const [inputValue, setInputValue] = useState(formatNumberWithSpaces(monthlyIncome));

    // Sync input field when monthlyIncome changes externally (e.g., from slider)
    useEffect(() => {
        setInputValue(formatNumberWithSpaces(monthlyIncome));
    }, [monthlyIncome]);

    const handleInputChange = (e) => {
        let value = e.target.value.replace(/\s/g, ""); // Remove spaces

        if (value === "") {
            setInputValue(""); // Allow user to clear input field
            return;
        }

        if (/^\d*$/.test(value)) { // Only allow numeric input
            setInputValue(formatNumberWithSpaces(value)); // Format input
            setMonthlyIncome(Number(value)); // Update state with valid number
        }
    };

    const handleInputBlur = () => {
        let numericValue = parseFloat(inputValue.replace(/\s/g, "")) || 0; // Convert input to number, fallback to 0

        // Ensure value stays within valid range
        if (numericValue < 0) {
            numericValue = 0;
        } else if (numericValue > 300000) {
            numericValue = 300000;
        }

        setMonthlyIncome(numericValue); // Update state
        setInputValue(formatNumberWithSpaces(numericValue)); // Format input
    };

    return ( 
        <Box>
            <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#000000" }}>
                Hushållets totala månadsinkomst
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
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
                value={monthlyIncome}
                min={0}
                max={300000}
                step={500}
                onChange={(_, newValue) => {
                    setMonthlyIncome(newValue);
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
                        "&:hover": {
                            boxShadow: "0px 0px 0px 8px rgba(37, 126, 215, 0.16)",
                        },
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

export default IncomeInput;
