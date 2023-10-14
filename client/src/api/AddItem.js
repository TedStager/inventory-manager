const BACKEND_URL = "https://inventory-manager.tedstager.com/api";

async function addItem (itemUserID, itemName, itemQuant) {

	try {
		const response = await fetch(BACKEND_URL + '/items', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: itemName,
				userID: itemUserID,
				quantity: itemQuant
			})
		});

		const data = await response.json();
		return data;
	}

	catch (error) {
		console.error('Error: ', error);
	}
}

export default addItem;