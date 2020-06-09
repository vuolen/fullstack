import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = ({onGood, onNeutral, onBad}) => (
  <>
    <button onClick={onGood}>good</button>
    <button onClick={onNeutral}>neutral</button>
    <button onClick={onBad}>bad</button>
  </>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all * 100) + "%"
  if (all === 0) {
    return (<>No feedback given</>)
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementState = (state, setter) => () => setter(state + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Feedback onGood={incrementState(good, setGood)}
                onNeutral={incrementState(neutral, setNeutral)}
                onBad={incrementState(bad, setBad)} />
      <h1>Statistics</h1>
      <Statistics good={good}
                  neutral={neutral}
                  bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)