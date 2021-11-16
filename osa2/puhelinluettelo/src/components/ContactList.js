import React from 'react';
import ContactItem from './ContactItem.js';

const ContactList = ({contacts, deleteContact}) => (
  <ul>
    {contacts.map((contact) =>
      <ContactItem name={contact.name}
        number={contact.number}
        key={contact.name}
        del={() => deleteContact(contact.id)}/>,
    )}
  </ul>
);

export default ContactList;
