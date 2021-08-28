import React from 'react'
import Filter from './Filter'
import personHandler from './../Services/persons'

const Numbers = ({ persons, filter, setFilter, setPersons, handleAlert }) => {
	const handleDelete = id => {
		let confirmation = window.confirm('Do you whant to dele this entry?')

		if (confirmation === true) {
			let user = persons.find(person => person.id === id)
			personHandler
				.deletePerson(id)
				.then(
					personHandler.getData().then(data => {
						setPersons(data)
						handleAlert(
							`${user.name} was deleted correctly from the phonebook`,
							'green'
						)
					})
				)
				.catch(err => {
					handleAlert(`${user.name} was already deleted previously`, 'red')
				})
		}
	}

	const filteredList = persons.map(person => {
		if (person.name.toUpperCase().startsWith(filter.toUpperCase()) === true) {
			return (
				<div key={person.id}>
					<p>
						{person.name} {person.number}
						<button onClick={() => handleDelete(person.id)}>Delete</button>
					</p>
				</div>
			)
		}
		return false
	})

	return (
		<div>
			<Filter filter={filter} setFilter={setFilter} />
			<div>{filteredList}</div>
		</div>
	)
}

export default Numbers
