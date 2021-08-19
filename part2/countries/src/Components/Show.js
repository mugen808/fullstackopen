import React, { useState, useEffect } from 'react'

const Show = ({ country }) => {
	const [toggle, setToggle] = useState(false)
	const [test, setTest] = useState('')
	const handleClick = e => {
		setToggle(!toggle)
	}
	useEffect(() => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.name}&units=metric&appid=fa8bc81bfdb6a67f8e6b1f03b55b4a6f`

		const fetchData = async () => {
			const response = await fetch(url)
			const data = await response.json()
			console.log('data', data)
			setTest(data)
		}

		fetchData()
	}, [country.name])
	console.log('test: ', test)
	if (toggle) {
		return (
			<div>
				<div>
					<label>{country.name} </label>
					<input type="submit" value="hide" onClick={handleClick} />
				</div>
				<h2>{country.name}</h2>
				<p>Capital: {country.capital}</p>
				<p>Population: {country.population}</p>
				<h3>Languages</h3>
				<ul>
					{country.languages.map(language => (
						<li key={language.name}>{language.name}</li>
					))}
				</ul>
				<img src={country.flag} width="150" alt="country flag" />
				<div>
					<h4>Weather in {country.capital}</h4>
					<p>
						{test.weather[0].main} - {test.weather[0].description}
					</p>
					<p>Temperature: {test.main.temp}</p>
					<p>Feels like: {test.main.feels_like}</p>
				</div>
			</div>
		)
	}
	return (
		<div>
			<label>{country.name} </label>
			<input type="submit" value="show" onClick={handleClick} />
		</div>
	)
}

export default Show
