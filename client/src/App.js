import React from 'react';
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SaleDialog from './components/SaleDialog';
import RestockDialog from './components/RestockDialog';

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

  const [saleDialogOpen, setSaleDialog] = useState(false);
  const [saleItem, setSaleItem] = useState(null);

  const handleSaleOpen = (item, quantity) => { 
    if (quantity > 0) {
      setSaleDialog(true); 
      setSaleItem(item); 
    }
  }
  const handleSaleClose = () => { setSaleDialog(false); }

  const [restockDialogOpen, setRestockDialog] = useState(false);
  const [restockItem, setRestockItem] = useState(null);

  const handleRestockOpen = (item) => { 
    setRestockDialog(true); 
    setRestockItem(item); 
  }
  const handleRestockClose = () => { setRestockDialog(false); }

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


      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>

        {itemList.map((item) => (
          <Paper 
            elevation={3} 
            sx={{ py: 1, my: 0.5, display: "flex", justifyContent: "space-between" }}
          >

            <Typography variant="h6" sx={{ px: 1, width: 200, textAlign: "center" }}>
              {item.name}
            </Typography>

            <Typography variant="h6" sx={{ px: 1, width: 100, textAlign: "center" }}>
              x{item.quantity}
            </Typography>

            <Box> {/* Group the Buttons together */}
              <Button variant="contained" 
               sx={{ mx: 1, bgcolor: item.quantity > 0 ? "primary.main" : "red",  "&:hover": { bgcolor: item.quantity > 0 ? "primary.dark" : "#D00000"} }} 
                      onClick={() => handleSaleOpen(item.name, item.quantity)} >
                Sale
              </Button>

              <Button variant="contained" sx={{ mx: 1 }}
                      onClick={() => handleRestockOpen(item.name)} >
                Restock
              </Button>

            </Box>


          </Paper>
        ))}
      </Box>

      <SaleDialog 
        handleClose={handleSaleClose} 
        open={saleDialogOpen} 
        item={saleItem} />

      <RestockDialog
        handleClose={handleRestockClose}
        open={restockDialogOpen}
        item={restockItem} />

    </Container>
  );
}

export default App;
