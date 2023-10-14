const BACKEND_URL = "https://inventory-manager.tedstager.com/api";

async function getItemList (userID) {

	var itemList = [];

	try {
		const response = await fetch(BACKEND_URL + '/items', {
			method: "GET",
			headers: {
				userid: userID
			}
		});

		if (!response.ok) {
			throw new Error('Not OK response.');
		}

		const data = await response.json();

		for (var datum of data) {
			itemList.push({
				name: datum.name,
				quantity: datum.quantity,
				inStock: datum.inStock,
				id: datum._id
			});
		}
	}

	catch (error) {
		console.error('Error: ', error);
	}

	

	return itemList;
}

export default getItemList;