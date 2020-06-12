import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, votes}) => (
  <>
    <div>
      {text}
    </div>
    <div>
      has {votes} votes
    </div>
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  const randomizeSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteSelected = () => {
    const copy = [...votes]
    copy[selected]++;
    setVotes(copy);
  }

  const getAnecdoteByIndex = (i) => (
    <Anecdote text={props.anecdotes[i]}
                votes={votes[i]} />
  )

  const mostVotedAnecdote = () => {
    let max = 0
    let imax = 0
    votes.forEach((el, i) => {
      if (el > max) {
        max = el
        imax = i
      }
    })

    return getAnecdoteByIndex(imax)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      {getAnecdoteByIndex(selected)}
      <button onClick={voteSelected}>
        vote
      </button>
      <button onClick={randomizeSelected}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      {mostVotedAnecdote()}
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)