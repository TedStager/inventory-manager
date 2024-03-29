const BACKEND_URL = "https://inventory-manager.tedstager.com/api"; 

async function newUser (userID, pass) {

	try {
		const response = await fetch(BACKEND_URL + '/users', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: userID,
				password: pass,
				businessName: " ",
			})
		});

		const data = await response.json();

		if (!response.ok) {
			alert("Username is taken!");
		}

		return data;
	}

	catch (error) {
		console.error('Error: ', error);
	}
}

export default newUser;