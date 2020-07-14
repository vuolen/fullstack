import React from 'react'

const ContactItem = ({name, number}) => (
    <li>
        {name} - {number}
    </li>
)

export default ContactItem