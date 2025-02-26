import { Typography, Box, Paper } from "@mui/material";

const Results = ({ totalCost, monthlyInterest, monthlyAmortization, amortizationRate, formatNumberWithSpaces }) => {
    return ( 
        <Box
        sx={{
          mt: {xs: 4, md: 0},
          minHeight: "100vh", // Ensures full-page background
          
        }}
        >  
          <Paper
          elevation={8}
          sx={{
            p: 3, 
            borderRadius: "12px"
            
          }}
          >
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
                  <Typography variant="h7" sx={{ color: "#000000" }}>Månatlig ränta</Typography>
                  <Typography variant="h6" sx={{ color: "#000000" }}>{formatNumberWithSpaces(monthlyInterest)} kr</Typography>
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
                  <Typography variant="h7" sx={{ color: "#000000" }}>Månatlig {amortizationRate}% amortering</Typography>
                  <Typography variant="h6" sx={{ color: "#000000"}}>{formatNumberWithSpaces(monthlyAmortization)} kr</Typography>
                </Box>
            </Box>
          </Paper> 
        </Box>
     );
}
 
export default Results;