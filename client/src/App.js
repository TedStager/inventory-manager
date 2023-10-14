import React from 'react';
import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SaleDialog from './components/SaleDialog';
import RestockDialog from './components/RestockDialog';
import LoginDialog from './components/LoginDialog';
import AddItemDialog from './components/AddItemDialog'

import getItemList from './api/ItemList'; // NOTE: this returns a promise

function App() {

  // ====== SALE DIALOG HANDLERS =======

  const [saleDialogOpen, setSaleDialog] = useState(false);
  const [[saleItem, saleItemID, quantInStock], setSaleItem] = useState([]);

  const handleSaleOpen = (item, quantity, id) => { 
    if (quantity > 0) {
      setSaleDialog(true); 
      setSaleItem([item, id, quantity]); 
    }
  }
  const handleSaleClose = () => { setSaleDialog(false); }

  // ====== RESTOCK DIALOG HANDLERS =====

  const [restockDialogOpen, setRestockDialog] = useState(false);
  const [[restockItem, restockItemID], setRestockItem] = useState([]);

  const handleRestockOpen = (item, id) => { 
    setRestockDialog(true); 
    setRestockItem([item, id]); 
  }
  const handleRestockClose = () => { setRestockDialog(false); }

  // ====== ADD ITEM HANDLERS ====== 

  const [addItemDialogOpen, setAddItemDialog] = useState(false);
  const handleAddItem = () => { setAddItemDialog(true); }
  const handleAddItemClose = () => { setAddItemDialog(false) }

  // ===== LOGIN HANDLERS =====

  const [loginDialogOpen, setLoginDialog] = useState(false);
  const [[currentUser, currentUserID], setCurrentUser] = useState(["", ""]);
  const handleLoginOpen = () => { setLoginDialog(true); }
  const handleLoginClose = () => { setLoginDialog(false); }
  const handleSignout = () => { setCurrentUser(["", ""]); }

  // ====== ITEM LIST =======

  const [itemList, updateItemList] = useState([]);
  useEffect(() => { // fetch when user changes
    getItemList(currentUserID).then((list) => updateItemList(list));
  }, [currentUser, saleDialogOpen, restockDialogOpen, addItemDialogOpen]);

  return (
    <Container>

      <Box sx={{ display: 'flex', flexDirection: 'row',
                       justifyContent: 'space-between', py: 2 }}>

        <Typography variant="h6">
          {currentUser == "" ? "Not logged in" : "Logged in as: " + currentUser}
        </Typography>


        <Button variant="contained" 
                onClick={currentUser == "" ? handleLoginOpen : handleSignout}>
          {currentUser == "" ? "Login or Sign Up" : "Sign Out"}
        </Button>
      </Box>

      <Typography 
        variant="h1"
        sx={{ my: 4, textAlign: "center", color: "primary.main" }}
      >
        My Store
      </Typography>

      <Box sx={{ display: "flex", 
                 flexDirection: "row", 
                 justifyContent: "space-between",
                 alignItems: "center" }}>

        <Typography
          variant="h2"
          sx={{ my: 1, textAlign: "left", color: "primary.secondary" }}
        >
        {itemList.length == 0 ? "Login or sign up to see your items." : "Items"}
        </Typography>

        <Button variant="contained" 
                sx={{ height: 40, mx: 1, display: currentUser == "" ? "none" : "block" }}
                onClick={handleAddItem}>
          Add item
        </Button>

      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>

        {itemList.map((item) => (
          <Paper 
            elevation={3} 
            sx={{ py: 1, my: 0.5, display: "flex", justifyContent: "space-between", bgcolor: '#eaeafb' }}
          >

            <Typography variant="h6" sx={{ px: 8, width: 250, textAlign: "left" }}>
              {item.name}
            </Typography>

            <Typography variant="h6" sx={{ px: 1, width: 100, textAlign: "center" }}>
              x{item.quantity}
            </Typography>

            <Box> {/* Group the Buttons together */}
              <Button variant="contained" 
               sx={{ mx: 1, bgcolor: item.quantity > 0 ? "primary.main" : "red",  "&:hover": { bgcolor: item.quantity > 0 ? "primary.dark" : "#D00000"} }} 
                      onClick={() => handleSaleOpen(item.name, item.quantity, item.id)} >
                Sale
              </Button>

              <Button variant="contained" sx={{ mx: 1 }}
                      onClick={() => handleRestockOpen(item.name, item.id)} >
                Restock
              </Button>

            </Box>


          </Paper>
        ))}
      </Box>

      <SaleDialog 
        handleClose={handleSaleClose} 
        open={saleDialogOpen} 
        item={saleItem}
        itemID={saleItemID}
        quantInStock={quantInStock} />

      <RestockDialog
        handleClose={handleRestockClose}
        open={restockDialogOpen}
        item={restockItem}
        itemID={restockItemID} />

      <LoginDialog
        handleClose={handleLoginClose}
        open={loginDialogOpen}
        setUser={setCurrentUser} />

      <AddItemDialog
        handleClose={handleAddItemClose}
        open={addItemDialogOpen}
        userID={currentUserID} />

    </Container>
  );
}

export default App;
