import React from 'react'
import Show from './Show'

const Countries = ({ filteredList }) => {
	return (
		<div>
			{filteredList.map(country => {
				return (
					<div key={country.name}>
						<br></br>
						<Show country={country} />
						<br></br>
					</div>
				)
			})}
		</div>
	)
}

export default Countries
