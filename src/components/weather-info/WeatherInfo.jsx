import React from 'react'
import classes from './weatherinfo.module.css'
import ClearSunIco from '../../assets/images/sun.png'
import ClearMoonIco from '../../assets/images/moon.png'
import CloudsIco from '../../assets/images/weather.png'
import CloudsNightIco from '../../assets/images/night.png'
import SnowIco from '../../assets/images/weather.png'
import RainIco from '../../assets/images/rainy.png'
import Humidity from '../../assets/images/drop.png'
import Wind from '../../assets/images/mist.png'
import Thermometer from '../../assets/images/feelslike.png'

const WeatherInfo = ({ temp, main, weatherMain, wind, humidity, feelsLike, sunrise, sunset, city }) => {

    const isNight = (sunrise, sunset) => {
        const currentTime = new Date().getTime() / 1000;
        return currentTime < sunrise || currentTime > sunset;
    };

    const isItNight = isNight(sunrise, sunset)

    const getWeatherIcon = (weatherMain) => {
        switch (weatherMain) {
            case 'Clear':
                return isItNight ? ClearMoonIco : ClearSunIco;
                break;

            case 'Clouds':
                return isItNight ? CloudsNightIco : CloudsIco
                break;

            case 'Rain' || 'Drizzle':
                return RainIco
                break;

            case 'Snow':
                return SnowIco
                break;

            default:
                break;
        }
    }

    const getWeatherVideo = (weatherMain) => {
        switch (weatherMain) {
            case 'Clear':
                return isItNight ? "https://cdn.pixabay.com/video/2020/01/25/31569-387675206_large.mp4" : "https://cdn.pixabay.com/video/2016/08/22/4753-179739298_large.mp4"
                break;

            case 'Clouds':
                return isItNight ? "https://cdn.pixabay.com/video/2024/08/10/225775_large.mp4" : "https://cdn.pixabay.com/video/2024/08/15/226573_large.mp4"
                break;

            case 'Rain':
                return "https://cdn.pixabay.com/video/2023/09/23/181916-867576005_large.mp4"
                break;

            case 'Snow':
                return "https://cdn.pixabay.com/video/2023/11/30/191443-890121806_large.mp4"
                break;

            default:
                break;
        }
    }

    const weatherVideo = getWeatherVideo(weatherMain)
    const weatherIcon = getWeatherIcon(weatherMain)

    return (
        <>
            <video autoPlay loop muted className="background-video" key={`${city}-${weatherMain}`}>
                <source src={weatherVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.box}>
                <div className={classes.top}>
                    <div className={classes.location}>
                        <h1>{city}</h1>
                        <div>
                            <h3>{main}</h3>
                            <h5>{temp}&#x2103;</h5>
                        </div>
                    </div>
                    <div className={classes.icon_weather}>
                        <img src={weatherIcon} alt="weatherIcon" />

                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.wind}>
                        <h1>{wind} km/h</h1>
                        <div className={classes.icon}>
                            <img src={Wind} alt="wind-png" />
                        </div>
                    </div>
                    <div className={classes.humidity}>
                        <h1>{humidity}%</h1>
                        <div className={classes.icon}>
                            <img src={Humidity} alt="wind-png" />
                        </div>
                    </div>
                    <div className={classes.feelslike}>
                        <h1>{feelsLike}&#x2103;</h1>
                        <div className={classes.icon}>
                            <img src={Thermometer} alt="wind-png" />
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default WeatherInfo