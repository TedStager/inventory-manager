import React from 'react';
import { useState } from 'react';
import { Typography, Container, Paper, Box, Button } from '@mui/material';

const itemList = [
    {
      name: "Bananas",
      quantity: 14,
      inStock: true
    },
    {
      name: "Oranges",
      quantity: 4,
      inStock: true
    },
    {
      name: "Grapes",
      quantity: 0,
      inStock: false
    },
  ];

function App() {
  return (
    <Container>
      <Typography 
        variant="h1"
        sx={{ my: 4, textAlign: "center", color: "primary.main" }}
      >
        My Store
      </Typography>

      <Typography
        variant="h2"
        sx={{ my: 1, textAlign: "left", color: "primary.secondary" }}
      >
        Items
      </Typography>


      <Box sx={{ display: "flex", flexDirection: "column"}}>
        {itemList.map((item) => (
          <Paper 
            elevation={3} 
            sx={{ py: 1, my: 0.5, display: "flex", justifyContent: "space-between" }}
          >

            <Typography variant="h6" sx={{ px: 1, width: 200, textAlign: "center" }}>
              {item.name}
            </Typography>

            <Typography variant="h6" sx={{ px: 1, width: 100, textAlign: "center" }}>
              {item.quantity}
            </Typography>

            <Box>
              <Button variant="contained" sx={{ mx: 1 }}>
                Sale
              </Button>

              <Button variant="contained" sx={{ mx: 1 }}>
                Restock
              </Button>

            </Box>


          </Paper>
        ))}
      </Box>

    </Container>
  );
}

export default App;
