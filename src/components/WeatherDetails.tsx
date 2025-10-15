import { useEffect, useState } from "react";
import type Weather from "../models/Weather";
import { fetchWeather } from "../services/WeatherService";

// const IMAGE_URL = "//cdn.weatherapi.com/weather/64x64/day/296.png"
const WeatherDetails: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<string>("");

  const handleSearch = async () => {
    if (!city) return;
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    }
  };

  return (
    <>
      <div>
          <h2>Weather App</h2>
          <input value={city} onChange={e =>setCity(e.target.value)} placeholder="Enter the City" />
          <button onClick={handleSearch}> 🔎 Search </button>
          {weather &&  
           <div className="card">
          <img src={weather.current.condition.icon} className="card-img-top" alt={weather.current.condition.text} />
          <div className="card-body">
            <h5 className="card-title">{weather.location.name}, {weather.location.country}</h5>
            <p className="card-text">{weather.location.localtime}</p>
            <p className="card-text">Humidity: {weather.current.humidity}</p>
            <p className="card-text">Temprature: {weather.current.temp_c}</p>
          </div> 
          </div>
          }
      </div>
    </>
  );
};

export default WeatherDetails;
