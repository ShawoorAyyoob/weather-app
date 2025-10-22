import { useState } from "react";
import { fetchWeather } from "../services/WeatherService";

const IMAGE_URL = "//cdn.weatherapi.com/weather/64x64/day/296.png";

const SearchWeather: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState<String | null>(null);

  const searchHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchWeather(city);
      setWeather(response);
    } catch (error) {
      setError("Could not fetch weather data. Please try again later.");
    }
  };
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={searchHandle}>
       🔎 Search City
      </button>

        {error && <div className="alert alert-danger mt-2">{error}</div>}
         {weather && (
        <div className="card p-3 shadow-sm mt-3">
          <h4>{weather.location.name}</h4>
          <p>🌡️ Temp: {weather.current.temp_c}°C</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
          <p>🌬️ Wind: {weather.current.wind_kph} km/h</p>
          <img src={weather.current.condition.icon} alt="Weather icon" />
        </div>
      )}
      </div>
  );
};
export default SearchWeather;