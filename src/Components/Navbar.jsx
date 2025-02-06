import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      
      sx={{
        width: "100%",
        height: "60px",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        
      }}
    >
      <Container>
        <Typography
          variant="h6"
          sx={{
            color: "aliceblue",
            fontSize: "25px",
          }}
        >
          Bolånekalkyl
        </Typography>
      </Container>
    </Box>
  );
};

export default Navbar;
