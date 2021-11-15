import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import ContactFilterForm from "./components/ContactFilterForm";
import Notification from "./components/Notification";

import personsService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [isNotificationError, setIsNotificationError] = useState(false);


  useEffect(() => {
    personsService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const setNotificationForFiveSeconds = (text, error = false) => {
    setNotification(text);
    setIsNotificationError(error);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addName = (event) => {
    event.preventDefault();

    if (persons.some((elem) => elem.name === newName)) {
      const existing = persons.find((p) => p.name === newName);
      const newPerson = { ...existing, number: newNumber };
      const confirm = window.confirm(
        `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        personsService.update(newPerson.id, newPerson).then((data) => {
          setPersons(persons.map((p) => (p.id !== newPerson.id ? p : data)));
          setNewName("");
          setNewNumber("");
          setNotificationForFiveSeconds(`Updated ${newPerson.name}`);
        }).catch(error => {
          setNotificationForFiveSeconds(`${newPerson.name} has already been deleted from the server`, true);
        });
      }
      return;
    } else {
      const newPerson = { name: newName, number: newNumber };

      personsService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
        setNotificationForFiveSeconds(`Added ${newPerson.name}`);
      }).catch(error => {
        setNotificationForFiveSeconds(error.response.data.error, true);
      })
    }

    
  };

  const getFilteredContacts = () =>
    persons.filter((elem) =>
      elem.name.toLowerCase().includes(filter.toLowerCase())
    );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deleteContact = (id) => {
    const contact = persons.find((p) => p.id === id);
    const confirm = window.confirm(`Delete ${contact.name}?`);
    if (confirm) {
      personsService.del(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        setNotificationForFiveSeconds(`Deleted ${contact.name}`);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={notification}
        error={isNotificationError} />
      <ContactFilterForm filter={filter} setFilter={setFilter} />
      <h3>add a new contact</h3>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
