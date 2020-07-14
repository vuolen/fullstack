import React, { useState } from 'react'
import ContactItem from './components/ContactItem'
import ContactList from './components/ContactList'
import ContactFilterForm from './components/ContactFilterForm'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some((elem) => elem.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({name: newName,
                              number: newNumber}))
  }

  const getFilteredContacts = () => (
    persons
      .filter((elem) => 
        elem.name.toLowerCase().includes(filter.toLowerCase()))
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactFilterForm filter={filter} setFilter={setFilter} />
      <h3>add a new contact</h3>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
                  onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber}
                  onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ContactList contacts={getFilteredContacts()} />
    </div>
  )

}

export default App