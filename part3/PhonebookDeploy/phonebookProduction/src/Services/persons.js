import axios from 'axios'

const url = '/api/persons'

const getData = () => {
	const data = axios.get(url).then(response => {
		return response.data
	})
	return data
}

const insertPerson = newPerson => {
	const data = axios
		.post(url, newPerson)
		.then(response => response)
		.catch(err => Promise.reject(err.response.data))

	return data
}
const deletePerson = id => {
	const data = axios
		.delete(`${url}/${id}`)
		.then(response => response)
		.catch(err => Promise.reject(err.response.data))
	return data
}

const updatePerson = (newPerson, id) => {
	const data = axios
		.put(`${url}/${id}`, newPerson)
		.then(response => {
			return response
		})
		.catch(err => Promise.reject(err.response.data))
	return data
}

const exportObject = {
	getData,
	insertPerson,
	deletePerson,
	updatePerson
}

export default exportObject
