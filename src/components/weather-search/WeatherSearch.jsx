import React, { useState } from 'react';
import axios from 'axios';
import classes from './weathersearch.module.css';
import { FaSearch } from 'react-icons/fa';

const WeatherSearch = ({ placeholder, city, setCity, apiKey }) => {
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCity = event.target.elements.cityInput.value.trim();
        
        if (newCity === '') {
            setError('Please enter a city name.');
            return;
        }

        const isValid = await checkIfCityIsValid(newCity);
        if (isValid) {
            setCity(newCity);
            setError('');
        } else {
            setError('Error');
        }
    };

    const checkIfCityIsValid = async (city) => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            return res.data.cod !== '404';
        } catch (error) {
            console.error('Error checking city:', error);
            return false;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={classes.search}
                    placeholder={placeholder}
                    name="cityInput"
                />
                <button type="submit" className={classes.btn}><FaSearch /></button>
            </form>
            {error && <p className={classes.error}>{error}</p>}
        </>
    );
};

export default WeatherSearch;
