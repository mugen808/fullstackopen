import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = ({ courses }) => {
	const allCourses = courses.map(course => {
		return (
			<div key={course.id}>
				<Header header={course.name} />
				<Content content={course.parts} />
			</div>
		)
	})

	return <div>{allCourses}</div>
}

export default Course
