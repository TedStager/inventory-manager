const BACKEND_URL = "http://localhost:3000/api"; // change for deployment

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