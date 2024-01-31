import React, { Component } from 'react';
import styles from './ContactList.module.css';

export default class Contacts extends Component {
  render() {
    const { contacts } = this.props;
    return (
      <div className={`box ${styles.contactsList}`}>
        {this.renderList(contacts)}
      </div>
    );
  }
  handleDelete = id => {
    if (this.props.onDeleteContact) {
      this.props.onDeleteContact(id);
    }
  };
  renderList = items => {
    return items.map(el => {
      const name = `${el.name}`;
      const number = `${el.number}`;

      return (
        <div key={el.id} className={styles.phonebookListItem}>
          <span>{name}:</span>
          <span>{number}</span>
          <button type="button" onClick={() => this.handleDelete(el.id)}>
            Delete
          </button>
        </div>
      );
    });
  };
}
