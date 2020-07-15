import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_WEATHER_API_KEY

const Weather = ({city}) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
            .then(response => 
                setWeather(response.data)
            )
    }, [])

    if (weather.current === undefined) {
        return <p></p>
    }

    return (
        <p>
            temperature: {weather.current.temperature} <br/>
            <img alt={weather.current.weather_descriptions[0]}
                 src={weather.current.weather_icons[0]}>
            </img> <br/>
            wind: {weather.current.wind_speed} mph {weather.current.wind_dir}
        </p>
    )
}

const Country = ({country}) => (
    <div>
        <h1>{country.name}</h1>
        <p>
            capital {country.capital} <br/>
            population {country.population}
        </p>
        <h2>languages</h2>
        <ul>
            {country.languages.map((elem) => 
                <li key={elem.name}>{elem.name}</li>
            )}
        </ul>
        <img alt="flag" width="200px" src={country.flag}/>
        <h2>Weather in {country.capital}</h2>
        <Weather city={country.capital}/>
    </div>
)

const CountryDisplay = ({countries, setFilter}) => {

    if (countries.length > 10) {
        return <div>Too many matches</div>
    } else if (countries.length > 1) {
        return (
            <ul>
                {countries.map((elem) => 
                    <li key={elem.name}>
                        {elem.name}
                        <button onClick={() => setFilter(elem.name)}>
                            show
                        </button>
                    </li>
                )}
            </ul>
        )
    } else if (countries.length === 1) {
        return <Country country={countries[0]}/>
    }

    return <div>No matches</div>
}

export default CountryDisplay;
