import React, { useState, useEffect } from 'react'
import contactService from './services/contacts'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notifications from './components/Notifications'

const Filter = ({ onChange }) => {
  return (
    <span>filter person with :<input onChange={onChange} /></span>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newView, setView] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleView = (event) => {
    setView(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const addName = {
      name: newName,
      number: newNumber,
      btn: true,
    }
    const personNames = persons.map(person => person.name)
    const findPerson = persons.find(n => n.name === addName.name)
    const changedNumber = { ...findPerson, number: newNumber }

    personNames.indexOf(newName) !== -1
      ? window.confirm(`${newName} is already added in the phone book, replace old number with new?`)
        ? contactService.update(findPerson.id, changedNumber).then(returnedContact => {
          setPersons(persons.map(p => p.id !== findPerson.id ? p : returnedContact))
          setErrorMessage(`Updated phone number of ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }).catch(error => {
          setErrorMessage(`Information of ${newName} has been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        : console.log("do nothing")
      : contactService
        .create(addName)
        .then(response => {
          setPersons(persons.concat(response))
          setErrorMessage(`Added ${addName.name} to phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    setNewName('')
    setNewNumber('')
  }


  const deletePerson = (id) => {
    if (window.confirm(`Do you really want to delete ${id}?`)) {
      const pers = persons.find(p => p.id === id)
      const objPerson = { ...pers, btn: false }

      contactService
        .deleteContact(id, objPerson)
        .then(returnedContact => {
          setPersons(persons.map(person => person.id !== id ? person : returnedContact))
        })
    }
  }

  const showPersons = (newView !== '')
    ? persons.filter(person => person.name.toLowerCase().includes(newView.toLowerCase()))
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Notifications message={errorMessage} />
      <Filter onChange={handleView} />

      <h3>Add new contact</h3>
      <PersonForm newName={newName} newNumber={newNumber}
        onChangeName={handleNewName} onChangeNumber={handleNewNumber} onClick={handleSubmit} />

      <h2>Numbers</h2>

      {showPersons.map((person, i) =>
        <Persons
          key={i}
          name={person.name}
          number={person.number}
          btn={person.btn}
          deletePerson={() => deletePerson(person.id)}
        />
      )}

    </div>
  )
}

export default App