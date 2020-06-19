import React from 'react'

const Header = ({name}) => (<h1>{name}</h1>)

const Content = ({parts}) => {
  return (
    <>
      {parts.map(({name, exercises}) => 
        <Part name={name} exercises={exercises} />)}
    </>
  )
}

const Part = ({name, exercises}) => (<p>{name} {exercises}</p>)

const Total = ({parts}) => (<b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises </b>)

const Course = ({course}) => (
  <div>
    <Header name={course.name}/>
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course