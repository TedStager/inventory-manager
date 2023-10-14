import React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import authUser from '../api/AuthUser';
import newUser from '../api/NewUser';

const LoginDialog = (props) => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		authUser(username, password).then((res) => {
			if (res.auth) {
				props.setUser([username, res.userID]);
				alert("Login successful!")
			}
			else
				alert("Incorrect username or password.");
		});

		handleClose();
	}

	const handleSignup = () => {
		newUser(username, password).then(res => {
			if (res.hasOwnProperty("username")) {
				console.log("ID", res._id);
				props.setUser([username, res._id]);
				alert("Signup successful!");
			}
			else
				alert("Something went wrong.");
		})

		handleClose();
	}

	const handleClose = () => {
		props.handleClose();
	}


	return (
		<Dialog open={props.open} onClose={handleClose} >

			<DialogTitle>
				Login or Sign up
			</DialogTitle>

			<DialogContent>
				<TextField
					autoFocus
		            margin="dense"
		            id="username"
		            label="Username"
		            type="string"
		            fullWidth
		            variant="standard"
		            onChange={e => {
		            	setUsername(e.target.value);
		            }} />

				<TextField
					autoFocus
		            margin="dense"
		            id="password"
		            label="Password"
		            type="password"
		            fullWidth
		            variant="standard"
		            onChange={e => {
		            	setPassword(e.target.value);
		            }} />

            </DialogContent>

            <DialogActions>

				<Button variant="contained" onClick={handleClose} 
						sx={{ bgcolor: 'red', 
							  '&:hover': { bgcolor: '#D00000' } }}>
					Cancel
				</Button>

				<Button variant="outlined" onClick={handleSignup}>
        			Sign Up
        		</Button>

            	<Button variant="contained" onClick={handleLogin}>
            		Login
        		</Button>

    		</DialogActions>
        </Dialog>
	);
}

export default LoginDialog;