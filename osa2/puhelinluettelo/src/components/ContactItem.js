import React from 'react';

const ContactItem = ({name, number, del}) => (
  <li>
    {name} - {number}
    <button onClick={del}>
            delete
    </button>
  </li>
);

export default ContactItem;
