const BACKEND_URL = "https://inventory-manager.tedstager.com/api";

async function changeQuant (itemID, change) {

	try {
		const response = await fetch(BACKEND_URL + '/items', {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: itemID,
				numSold: change,
			})
		});

		const data = await response.json();

		if (!response.ok) {
			alert("Something went wrong.");
		}

		return data;
	}

	catch (error) {
		console.error('Error: ', error);
	}
}

export default changeQuant;