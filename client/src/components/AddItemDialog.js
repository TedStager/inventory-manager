import React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import addItem from '../api/AddItem'

const AddItemDialog = (props) => {

	const [quant, setQuant] = useState(1);
	const handleMore = () => { let newQuant = quant + 1; setQuant(newQuant); }
	const handleLess = () => { 
		let newQuant = quant - 1; 
		if (newQuant > 0) setQuant(newQuant);
	}

	const [itemName, setItemName] = useState("");


	const handleAddItem = () => {
		addItem(props.userID, itemName, quant).then((res) => {
			if (res.hasOwnProperty("name")) {
				alert("Successfully added item!");
			}
			else
				alert("Something went wrong.");
		});

		handleClose();
	}

	const handleClose = () => {
		setQuant(1);
		setItemName("");
		props.handleClose();
	}

	return (
		<Dialog open={props.open} onClose={handleClose}
		 		fullWidth="true" maxWidth="sm" >

			<DialogTitle sx={{ fontSize: 24 }}>
				Add item:
			</DialogTitle>

			<DialogContent>
				
				<TextField
					autoFocus
		            margin="dense"
		            id="itemName"
		            label="Item Name"
		            type="string"
		            fullWidth
		            variant="standard"
		            onChange={e => {
		            	setItemName(e.target.value);
		            }} />

				<Container 
				sx={{ display: 'flex', flexDirection: 'row', my: 2, justifyContent: 'center'}}>
			
					<Fab color="primary" aria-label="less-quant" onClick={handleLess}>
						<RemoveIcon />
					</Fab>

					<Typography 
					 sx={{ my: 2, mx: 4, fontSize: 18, textAlign: 'center' }}>
						{quant}
					</Typography>

					<Fab color="primary" aria-label="add-quant" onClick={handleMore}>
						<AddIcon />
					</Fab>

				</Container>

				<DialogActions>

					<Button variant="contained" onClick={handleClose} 
							sx={{ bgcolor: 'red', 
								  '&:hover': { bgcolor: '#D00000' } }}>
						Cancel
					</Button>


					<Button variant="contained" onClick={handleAddItem}>
						Add Item
					</Button>

				</DialogActions>


			</DialogContent>
		</Dialog>
	);

}

 export default AddItemDialog;