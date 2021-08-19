import React from 'react'
import Countries from './Countries'

const List = ({ list, filter }) => {
	const filteredList = list.filter(country =>
		country.name.toLowerCase().startsWith(filter.toLowerCase())
	)

	if ((filteredList.length > 10) & (filter !== '')) {
		return <p>Too many countries. Please refine your search</p>
	} else if (filteredList.length < 11) {
		return <Countries filteredList={filteredList} />
	}
	return <p>Use the input to search for countries</p>
}

export default List
