import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useGetWeather = () => {
  const REACT_APP_WEATHER_API_KEY = "bcacd9db34d20c4735e1b1dee8ce884a";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState([]);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      setError("Could not fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      console.log("Fetching data....");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLat(location.coords.latitude);
      setLon(location.coords.longitude);
      await fetchWeatherData();
    })();
  }, [lat, lon]);

  if (weather) {
    // console.log(weather);
  }

  return [loading, error, weather];
};
