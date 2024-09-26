import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherInfo from './components/weather-info/WeatherInfo'
import WeatherSearch from './components/weather-search/WeatherSearch'
import kelvinToCelcius from './kelvinToCelcius';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Baku")

  const getData = async () => {
    const cityName = "Baku"
    const apiKey = '4ac3ae2e7d110a0d1a95dd7ac9856a79'
    const res = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    setWeatherData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      getData()
    }, 1000);
    return () => {
      clearTimeout(myTimeOut)
    }
  }, [city])

  return (
    <>
      <div className="container">
        <WeatherSearch placeholder="Enter the Location" city={city} setCity={setCity} apiKey="4ac3ae2e7d110a0d1a95dd7ac9856a79" />
        {weatherData && weatherData.main ? (
          <WeatherInfo temp={kelvinToCelcius(weatherData?.main?.temp)} main={weatherData.weather?.[0].main}
            weatherMain={weatherData.weather[0].main} wind={Math.floor(weatherData.wind?.speed)}
            humidity={weatherData?.main?.humidity} feelsLike={kelvinToCelcius(weatherData?.main?.feels_like)}
            sunrise={weatherData.sys.sunrise} sunset={weatherData.sys.sunset} city={city} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default App