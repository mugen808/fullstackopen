import React, { useState } from 'react'

const Button = ({ text, handleClick }) => {
	return <button onClick={() => handleClick(text)}>{text}</button>
}

const StatisticsLine = ({ type, value }) => {
	return (
		<tr>
			<td>{type}</td>
			<td>{value}</td>
		</tr>
	)
}
const Statistics = ({ good, neutral, bad, clicks, scores }) => {
	let average = scores / clicks
	let positive = good / clicks
	if (clicks === 0) {
		return (
			<div>
				<h2>Statistics</h2>
				<p>No feedback given</p>
			</div>
		)
	}
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Statistics</th>
					</tr>
				</thead>
				<tbody>
					<StatisticsLine type="Good" value={good} />
					<StatisticsLine type="Neutral" value={neutral} />
					<StatisticsLine type="Bad" value={bad} />
					<StatisticsLine type="Total" value={clicks} />
					<StatisticsLine type="Average" value={average} />
					<StatisticsLine type="Positive" value={positive} />
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [clicks, setClicks] = useState(0)
	const [scores, setScores] = useState(0)

	const handleClick = feedback => {
		if (feedback === 'good') {
			console.log(feedback)
			setGood(good + 1)
			setClicks(clicks + 1)
			setScores(scores + 1)
		}
		if (feedback === 'neutral') {
			console.log('neutral')
			setNeutral(neutral + 1)
			setClicks(clicks + 1)
		}
		if (feedback === 'bad') {
			console.log('bad before')
			setBad(bad + 1)
			setClicks(clicks + 1)
			setScores(scores - 1)
		}
	}

	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" handleClick={handleClick} />
			<Button text="neutral" handleClick={handleClick} />
			<Button text="bad" handleClick={handleClick} />
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				clicks={clicks}
				scores={scores}
			/>
		</div>
	)
}

export default App
