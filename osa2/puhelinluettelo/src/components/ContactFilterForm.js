import React from 'react';

const ContactFilterForm = ({filter, setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
            search by
      <input value={filter}
        onChange={handleFilterChange} />
    </div>
  );
};

export default ContactFilterForm;
