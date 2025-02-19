import { TextField, Typography, Slider, Box } from "@mui/material";

const PropertyValueInput = ({ propertyValue, setPropertyValue, formatNumberWithSpaces, minimumDeposit }) => {
    return ( 
        <Box>
            <Typography variant="h6" sx={{ mb: 1, color: "#000000" }}>
            Bostadens värde
            </Typography>
            <TextField
            variant="outlined"
            fullWidth
            value={propertyValue === "" ? "" : formatNumberWithSpaces(propertyValue)}
            onChange={(e) => setPropertyValue(Number(e.target.value.replace(/\s/g, "")))}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
            />
            <Slider
            value={propertyValue}
            min={100000}
            max={15000000}
            step={10000}
            onChange={(_, newValue) => setPropertyValue(newValue)}
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
            
            <Typography variant="body2" sx={{ color: "gray", mt: 2 }}>
                Minsta kontantinsats: {formatNumberWithSpaces(minimumDeposit)} kr
            </Typography>
      </Box>
     );
}
 
export default PropertyValueInput;