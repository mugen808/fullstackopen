import React, { useState, useEffect } from 'react'
import Form from './Components/Form'
import Numbers from './Components/Numbers'
import personHandler from './Services/persons'
import Header from './Components/Header'
import Alerts from './Components/Alerts'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [alert, setAlert] = useState({ message: '', color: '' })

	const handleAlert = (msg, imp) => {
		setAlert(alert => ({ ...alert, message: msg, color: imp }))
		setTimeout(() => {
			setAlert(alert => ({ ...alert, message: '', color: '' }))
		}, 3000)
	}

	useEffect(() => {
		personHandler.getData().then(data => setPersons(data))
	}, [])
	return (
		<div>
			<Header />
			<Alerts alert={alert} />
			<Form
				setNewName={setNewName}
				persons={persons}
				setPersons={setPersons}
				newName={newName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				setAlert={setAlert}
				handleAlert={handleAlert}
			/>
			<h3>Numbers</h3>
			<Numbers
				persons={persons}
				setPersons={setPersons}
				filter={filter}
				setFilter={setFilter}
				setAlert={setAlert}
				handleAlert={handleAlert}
			/>
		</div>
	)
}

export default App
