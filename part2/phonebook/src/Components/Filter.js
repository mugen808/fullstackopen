import React from 'react'

const Filter = ({ filter, setFilter }) => {
	const getFilter = e => {
		setFilter(e.target.value)
	}

	return (
		<div>
			filter: <input value={filter} onChange={getFilter} />
		</div>
	)
}

export default Filter
