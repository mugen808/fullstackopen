import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from './Components/List'

const App = () => {
	const [list, setList] = useState([])
	const [filter, setFilter] = useState('')
	const fetchData = () => {
		axios.get('https://restcountries.eu/rest/v2/all').then(response => {
			setList(response.data)
		})
	}
	const getFilter = e => {
		setFilter(e.target.value)
	}
	useEffect(fetchData, [])

	return (
		<div>
			<h1>Countries list</h1>
			<input value={filter} onChange={getFilter} />
			<List list={list} filter={filter} />
		</div>
	)
}

export default App
