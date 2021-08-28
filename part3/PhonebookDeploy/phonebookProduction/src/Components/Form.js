import React from 'react'
import Button from './Button'
import personHandler from './../Services/persons'

const Form = ({
	setNewName,
	persons,
	setPersons,
	newName,
	newNumber,
	setNewNumber,
	handleAlert
}) => {
	const checkDuplicate = () => {
		const nameList = persons.map(person => person.name.toUpperCase())
		const check = nameList.includes(newName.toUpperCase())
		return check
	}

	const handleSubmit = e => {
		e.preventDefault()
		const newPerson = { name: newName, number: newNumber }
		const question = `${newName} is already included in the list. Do you want to update it?`
		const user = persons.find(
			person => person.name.toUpperCase() === newName.toUpperCase()
		)

		if (checkDuplicate() === true && window.confirm(question) === true) {
			personHandler
				.updatePerson(newPerson, user.id)
				.then(response =>
					setPersons(
						persons.map(person =>
							person.id !== user.id ? person : response.data
						)
					)
				)
			handleAlert(
				`${newPerson.name} was updated succesfuly from the list!`,
				'green'
			)
			clearInput()
		} else if (checkDuplicate() === false) {
			personHandler
				.insertPerson(newPerson)
				.then(response => {
					setPersons(persons.concat([response.data]))
					handleAlert(
						`${newPerson.name} was correctly added to the phonebook`,
						'green'
					)
					clearInput()
				})
				.catch(err => {
					handleAlert(`${err.error}`, 'red')
				})
		}
		return null
	}

	const clearInput = () => {
		setNewName('')
		setNewNumber('')
	}
	const getName = e => {
		setNewName(e.target.value)
	}
	const getNumber = e => {
		setNewNumber(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input value={newName} onChange={getName} type="text" required />
			</div>
			<div>
				number:{' '}
				<input value={newNumber} onChange={getNumber} type="number" required />
			</div>
			<Button />
		</form>
	)
}

export default Form
