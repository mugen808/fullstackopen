import React from 'react'

const greenAlert = {
	color: 'black',
	border: '2px solid green',
	borderRadius: '10px',
	backgroundColor: '#DCDCDC',
	fontSize: '30px',
	fontFamily: 'Arial',
	padding: '15px 15px'
}

const redAlert = {
	color: 'black',
	border: '2px solid red',
	borderRadius: '10px',
	backgroundColor: '#DCDCDC',
	fontSize: '30px',
	fontFamily: 'Arial',
	padding: '15px 15px'
}

const Alert = ({ alert }) => {
	if (alert.message && alert.color === 'green') {
		return (
			<div>
				<p style={greenAlert}>{alert.message}</p>
			</div>
		)
	}
	if (alert.message && alert.color === 'red') {
		return (
			<div>
				<p style={redAlert}>{alert.message}</p>
			</div>
		)
	}
	return null
}

export default Alert
