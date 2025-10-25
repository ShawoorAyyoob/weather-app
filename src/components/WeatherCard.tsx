import { useState } from "react";
import { fetchWeather } from "../services/WeatherService";
import "../styles/WeatherCard.css";
import type Weather from "../models/Weather";

const WeatherCard: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const cities = city.trim();
    if (!cities) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const weatherDetails = await fetchWeather(city);
      setWeather(weatherDetails);
    } catch (error) {
      setError("Failed to fetch weather data.");
      setWeather(null);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 cardContainer">
      <label className="visually-hidden" htmlFor="cityInput">City</label>
      <input
      id="cityInput"
        type="text"
        className="form-control mb-2"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
       <div style={{ display: "flex", gap: 8 }}>
        <button
          className="btn btn-primary"
          onClick={handleSearch}
        >
          {loading ? "Searching…" : "Search"}
        </button>
        <button
          className="btn btn-outline"
          type="button"
          onClick={() => { setCity(""); setWeather(null); setError(null); }}
        >
          Clear
        </button>
      </div>
      {loading && <p>Loading weather info...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {weather && (
        <div className="card p-3 shadow-sm">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
           <div>
              <div className="cityName">{weather.location.name}, {weather.location.country}</div>
              <div className="weatherDetails">{weather.location.localtime}</div>
            </div>
          </div>
          <div className="weatherDetails" style={{ marginTop: 12 }}>
            <div>🌡️ <strong>{weather.current.temp_c}°C</strong> — {weather.current.condition.text}</div>
            <div>💧 Humidity: {weather.current.humidity}%</div>
          </div>
          <img src={weather.current.condition.icon} alt="Weather icon" />
        </div>
      )}
    </div>
  );
};
export default WeatherCard;
