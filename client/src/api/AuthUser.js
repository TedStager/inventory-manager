const BACKEND_URL = "https://inventory-manager.tedstager.com/api";

async function authUser (userID, pass) {

	try {
		const response = await fetch(BACKEND_URL + '/users', {
			method: "GET",
			headers: {
				userid: userID,
				password: pass
			}
		});

		const data = await response.json();
		return data;
	}

	catch (error) {
		console.error('Error: ', error);
	}
}

export default authUser;