import { useState } from "react";
import { fetchWeather } from "../services/WeatherService";
import "../styles/SearchWeather.css"

const SearchWeather: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const searchHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city.");
      setWeather(null);
      return;
    }
    setError(null)
    try {
      const response = await fetchWeather(city);
      setWeather(response);
    } catch (error) {
      setError("Could not fetch weather data. Please enter correct city.");
      setWeather(null);
    }
  };
  return (
    <form className="searchForm" onSubmit={searchHandle} aria-label="Search weather">
      <input
        type="text"
        className="form-control"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary mt-2" type="submit">
       🔎 Search City
      </button>

        {error && <div className="alert alert-danger mt-2">{error}</div>}
         {weather && (
        <div className="card shadow-sm ">
          <div className="city">{weather.location.name}, {weather.location.country}</div>
          <div className="details">
            <div>{weather.location.localtime}</div>
            <div>Temp: <strong>{weather.current.temp_c}°C</strong></div>
            <div>Humidity: {weather.current.humidity}%</div>
          </div>
        </div>
      )}
      </form>
  );
};
export default SearchWeather;