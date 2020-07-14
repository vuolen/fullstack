import React from 'react'
import ContactItem from './ContactItem.js'

const ContactList = ({contacts}) => (
    <ul>
        {contacts.map((contact) => 
            <ContactItem  name={contact.name}
                number={contact.number}
                key={contact.name}/>
        )}
    </ul>
)

export default ContactList