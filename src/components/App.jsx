import './App.css';
import React, { useEffect, useState } from 'react';
import Filter from './Filter/Filter';
import ContactList from './Contacts/ContactList';
import { nanoid } from 'nanoid';
import ContactForm from './Contacts/ContactForm/ContactForm';
import PropTypes from 'prop-types';
const CONTACTS_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('Contacts a fost montat');
    const data = localStorage.getItem(CONTACTS_KEY);
    try {
      if (data) {
        setContacts(JSON.parse(data));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    console.log('Contacts a fost actualizat');
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = data => {
    const { name, number } = data;

    const IsContactInList = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (IsContactInList) {
      alert('Contact already exists!');
      return;
    }

    const contactToAdd = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([...contacts, contactToAdd]);
  };

  const handleFilterChange = filter => {
    setFilter(filter);
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1 className="heading">Phonebook</h1>
      <ContactForm onFormSubmit={handleAddContact} />

      <h1 className="heading">Contacts</h1>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.array,
};

export default App;
