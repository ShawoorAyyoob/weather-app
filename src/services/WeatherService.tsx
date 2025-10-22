import axios from "axios";

const API_KEY = "a93645c644044343bbe73310251310";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

export const fetchWeather = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/current.json`, {
    params: { api_key: API_KEY, q: city },
  });
  return response.data;
};
