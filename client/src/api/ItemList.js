const BACKEND_URL = "http://localhost:3000/api"; // change for deployment

async function getItemList (userID) {

	const ID = "6525c358743f5818b2997c52"; // testing
	var itemList = [];

	try {
		const response = await fetch(BACKEND_URL + '/items', {
			method: "GET",
			headers: {
				userid: ID
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
				inStock: datum.inStock
			});
		}
	}

	catch (error) {
		console.error('Error: ', error);
	}

	return itemList;
}

export default getItemList;