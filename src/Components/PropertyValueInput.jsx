import { TextField, Typography, Slider, Box } from "@mui/material";
import { useState, useEffect } from "react";

const PropertyValueInput = ({ propertyValue, setPropertyValue, formatNumberWithSpaces, minimumDeposit }) => {
    const [inputValue, setInputValue] = useState(formatNumberWithSpaces(propertyValue));

    // Sync input field when propertyValue changes externally
    useEffect(() => {
        setInputValue(formatNumberWithSpaces(propertyValue));
    }, [propertyValue]);

    const handleInputChange = (e) => {
        let value = e.target.value.replace(/\s/g, ""); // Remove spaces

        if (value === "") {
            setInputValue(""); // Allow user to clear input field
            return;
        }

        if (/^\d*$/.test(value)) { // Only allow numeric input
            setInputValue(formatNumberWithSpaces(value));
            setPropertyValue(Number(value)); // Only update state with valid numbers
        }
    };

    const handleInputBlur = () => {
        let numericValue = parseFloat(inputValue.replace(/\s/g, "")) || 100000; // Default to minimum value

        if (numericValue < 100000) {
            numericValue = 100000; // Enforce minimum property value
        } else if (numericValue > 15000000) {
            numericValue = 15000000; // Prevent exceeding max value
        }

        setPropertyValue(numericValue);
        setInputValue(formatNumberWithSpaces(numericValue)); // Format input after blur
    };

    return ( 
        <Box>
            <Typography variant="h6" sx={{ mb: 1, color: "#000000" }}>
                Bostadens värde
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
                value={propertyValue}
                min={100000}
                max={15000000}
                step={10000}
                onChange={(_, newValue) => {
                    setPropertyValue(newValue);
                    setInputValue(formatNumberWithSpaces(newValue)); // Sync with input
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
            <Typography variant="body2" sx={{ color: "gray", mt: 2 }}>
                Minsta kontantinsats: {formatNumberWithSpaces(minimumDeposit)} kr
            </Typography>
        </Box>
    );
};

export default PropertyValueInput;
