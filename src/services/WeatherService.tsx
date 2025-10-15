import axios from 'axios';
import type Weather from '../models/Weather';

const API_KEY = "a93645c644044343bbe73310251310";
const BASE_URL = "https://api.weatherapi.com";

export const fetchWeather = async (city:string) =>{
    const response = await axios.get<Weather>(`${BASE_URL}/current.json`, {
        params: {key: API_KEY, q: city}
        });
        return response.data;
    }