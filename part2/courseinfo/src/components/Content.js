import React from 'react'
import Part from './Part'

const Content = ({ content }) => {
	const part = content.map(part => (
		<Part part={part.name} key={part.id} exercises={part.exercises} />
	))

	const total = content.reduce((sum, cur) => sum + cur.exercises, 0)

	return (
		<div>
			<div>{part}</div>
			<div>Total {total}</div>
		</div>
	)
}

export default Content
