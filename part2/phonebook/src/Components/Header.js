import React from 'react'
import HeaderCSS from './Header.module.css'

const Header = () => {
	return (
		<div>
			<h1 className={HeaderCSS.title}>Phonebook</h1>

			<h2 className={HeaderCSS.add}>Add new phone</h2>
		</div>
	)
}

export default Header
