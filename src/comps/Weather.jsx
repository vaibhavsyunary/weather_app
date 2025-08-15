import React, { useEffect, useState } from 'react'
import './Weather.css'
import { city } from '.';
import weatherIcon from '../images/WeatherIcons.gif'


const Weather = () => {
  const [error, setError] = useState('')
  const [val,setVal] =useState('')
  const [date, setDate] = useState(new Date())
  const [hasData ,sethasData] =useState(false)
  const apiKey = "9f3d7950a7afa379e335384bf450e6fb";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dayName = days[date.getDay()];
const monthName = months[date.getMonth()];
  
  // console.log(date);

  useEffect(()=>{
    let timer =setInterval(() => {
      setDate(new Date())
    }, 1000);
     return () => clearInterval(timer);
  },[])
  
  const[weatherStatus,setWeatherStatus] = useState({
    countryName: '',
    temp: '',
    city: '',
    humidity:'',
    visibility: '',
    windSpeed:'',
    weather: '',
    weatherIcon :''


  })
  async function handleClick() {
   if (val.trim() === '') {
    return
   }

   try {
    setError('')
    const response = await fetch(`${apiUrl}${val}&appid=${apiKey}`);
    if (!response.ok) {throw Error('City not Found')};

    const data = await response.json();
   
    console.log(data);
    setWeatherStatus({
        countryName: data.sys.country,
        temp: data.main.temp,
        city: data.name,
        humidity:data.main.humidity,
        visibility: data.visibility,
        windSpeed:data.wind.speed,
        weather: data.weather[0].description,
        weatherIcon:data.weather[0].icon


    })
    
    sethasData(true)
    setVal('');
   } catch (error) {

    setError(error.message)
    
   }
   
   
   
  }

  return (
    <div className='container'>
      
      <div className="weather-app-box">
        <div className="weather-img" style={{
          backgroundImage: `url(${city})`,
          backgroundSize:'cover',
          overflow:'hidden',
          backgroundPosition:'center',
          borderRadius:'10px',
          position:'relative'
        }}> 
        {/* <div className="other-info"></div> */}
        <div className="city">{weatherStatus.city} </div>
        <div className="day-time">
        <div className="time">
          <p className="clock">
             {
          `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
           }
          </p>
          <p>
           {`${dayName}, ${date.getDate()} ${monthName}, ${date.getFullYear()}`}
          </p>
        </div>
        <div className="temp-box">
          <h1>{hasData?`${(weatherStatus.temp)}°C`:''}</h1>
        </div>
        </div>
      </div>
      <div className="weather-app">
        {
          hasData
          ? <img
          src={`https://openweathermap.org/img/wn/${weatherStatus.weatherIcon}@2x.png`}
          alt={weatherStatus.weatherDesc}
        />:''
        }
      
        <h1 className="mausam">
          {hasData ? weatherStatus.weather :'Welcome'}
        </h1>
        <div className="searchbar">
            <input placeholder='Search Any City' type="text" value={val} onChange={(e)=> setVal(e.target.value)}
             onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleClick();
                }
              }}
            
            />
          <button onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {
          hasData
          ?<>
           <div className="country">
        <p>{weatherStatus.city} {weatherStatus.countryName}</p>
      </div>
      <div className="temp">
        <p>Temperature</p>
        <p className='temp-result'>{weatherStatus.temp}°C</p>
      </div>
      <div className="humidity">
         <p>Humidity</p>
        <p className='humidity-result'>{weatherStatus.humidity}</p>
      </div>
      <div className="visibility">
         <p>Visibility</p>
        <p className='visibility-result'>{(weatherStatus.visibility / 1000).toFixed(1)} km</p>
      </div>
      <div className="wind-speed">
         <p>Wind Speed</p>
        <p className='wind-speed-result'>{(weatherStatus.windSpeed * 3.6).toFixed(1)} km/h</p>
      </div>
          </>
          :<div>
           <img style={{marginTop:'50px'}} width={280} src={weatherIcon} alt="" />
          </div>
        }
     

      </div>
      </div>
    </div>
  )
}

export default Weather