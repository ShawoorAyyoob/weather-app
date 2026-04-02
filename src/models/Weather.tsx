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
}