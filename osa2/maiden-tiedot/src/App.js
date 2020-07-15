import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDisplay from "./components/CountryDisplay"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => 
        setCountries(response.data)
      )
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const getFilteredCountries = () => {
    return countries.filter((elem) =>
      elem.name.toLowerCase().includes(filter.toLowerCase())
    )
  }

  return (
    <div>
      find countries 
      <input  value={filter}
              onChange={handleFilterChange}/>
      <CountryDisplay countries={getFilteredCountries()}
                      setFilter={setFilter}/>
    </div>
  )
}

export default App;
