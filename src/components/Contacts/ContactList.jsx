import React, { useEffect } from 'react';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => {
  const handleDelete = id => {
    if (onDeleteContact) {
      onDeleteContact(id);
    }
  };

  useEffect(() => {
    console.log('Contacts component was mounted');
  }, []);
  const renderList = items => {
    return items.map(el => {
      const name = `${el.name}`;
      const number = `${el.number}`;

      return (
        <div key={el.id} className={styles.phonebookListItem}>
          <span>{name}:</span>
          <span>{number}</span>
          <button type="button" onClick={() => handleDelete(el.id)}>
            Delete
          </button>
        </div>
      );
    });
  };
  return (
    <div className={`box ${styles.contactsList}`}>{renderList(contacts)}</div>
  );
};

ContactList.propTypes = {
  onFormSubmit: PropTypes.func,
  onDeleteContact: PropTypes.func,
};

export default ContactList;
