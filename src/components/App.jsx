import './App.css';
import React, { Component } from 'react';
import Filter from './Filter/Filter';
import ContactList from './Contacts/ContactList';
import { nanoid } from 'nanoid';
import ContactForm from './Contacts/ContactForm/ContactForm';
const CONTACTS_KEY = 'contacts';
export default class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  async componentDidMount() {
    console.log('Contacts a fost montat');
    const data = localStorage.getItem(CONTACTS_KEY);
    try {
      if (data) {
        this.setState({
          contacts: JSON.parse(data),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  componentDidUpdate(_prevProps, prevState) {
    console.log('Contacts a fost actualizat');
    console.dir(JSON.stringify(this.state));
    if (prevState?.contacts.length !== this.state.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }
  handleAddContact = data => {
    const { name, number } = data;

    const IsContactInList = this.state.contacts.some(
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

    this.setState({
      contacts: [...this.state.contacts, contactToAdd],
    });
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };
  handleDeleteContact = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div>
        <h1 className="heading">Phonebook</h1>
        <ContactForm onFormSubmit={this.handleAddContact} />

        <h1 className="heading">Contacts</h1>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
