const shortID= require('short-id');

let chars= [
    {
        id: shortID.generate(),
        name: 'James Bond',
        bio: 'Greatest British Agent'
    },
    {
        id: shortID.generate(),
        name: 'Tom Cruise',
        bio: 'Greatest American Agent'
    },
    {
        id: shortID.generate(),
        name: 'Evelyn Salt',
        bio: 'Greatest Double Agent'
    }
];

function getChars() {
	return chars;
}

function getCharsById(id) {
	return chars.find(u => u.id === id);
}

function createChar(data) {
	const payload = {
		// id: String(chars.length + 1),
		...data,
	}

	chars.push(payload);
	return payload;
}

function updateChar(id, data) {
	const index = chars.findIndex(u => u.id === id)
	chars[index] = {
		...chars[index],
		...data,
	}
	
	return chars[index];
}

function deleteChar(id) {
	chars = chars.filter(u => u.id != id);
}

module.exports = {
	getChars,
	getCharsById,
	createChar,
	updateChar,
    deleteChar,
    shortID,
}