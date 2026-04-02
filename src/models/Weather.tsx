export default interface Weather {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    uv: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  air_quality: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    "us-epa-index": number;
    "gb-defra-index": number;
  };
}
