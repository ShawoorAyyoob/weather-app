import { useEffect, useState } from "react";
import type Weather from "../models/Weather";
import { fetchWeather } from "../services/WeatherService";

const IMAGE_URL = "//cdn.weatherapi.com/weather/64x64/day/296.png";

const WeatherCard: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
try {
    const weatherDetails = await fetchWeather(city);
    setWeather(weatherDetails);
} catch (error) {
    setError("Failed to fetch weather data.");
    setLoading(false);
}
getWeather();
  }},[city]);

 return (
    <div className="mt-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {loading && <p>Loading weather data...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {weather && (
        <div className="card p-3 shadow-sm">
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
export default WeatherCard;
