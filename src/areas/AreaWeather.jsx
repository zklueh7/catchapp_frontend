import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CatchAppApi from "../api/api";
import axios from "axios";


/** Show weather information for an area.
 *
 * Is rendered by AreaCardList to show a "card" for each area.
 *
 * AreaCardList -> AreaCard
 */

function AreaWeather() {
  const { area } = useParams();

  const [areaInfo, setAreaInfo] = useState(null);
  const [areaWeather, setAreaWeather] = useState(null);

  useEffect(function getAreaAndWeatherInfoOnMount() {
    search(area);
  }, []);

  /** Loads area info and messages. */
  async function search(area) {
    let areaInfo = await CatchAppApi.getArea(area);
    setAreaInfo(areaInfo);
    getWeather(areaInfo.latitude, areaInfo.longitude);
  }

  /** Loads area weather */
  async function getWeather(lat, lng) {
    let url = "https://api.weatherapi.com/v1/current.json?key=be973e8b65bd4281b2c170504240607&q=" + lat + "," + lng;
    let areaWeather = await axios.get(url);

    setAreaWeather(areaWeather);
    console.log(areaWeather.data);
  }
  if (!areaWeather) return <LoadingSpinner />;

  return (

    <div className="container">
      <h3 className="heading">{areaInfo.title} Weather</h3>
        <div className="card-body text-center">
            <img src={areaWeather.data.current.condition.icon} className="forecast-img"></img>
            <p>{areaWeather.data.current.condition.text}</p>
            <p>Temperature: {areaWeather.data.current.temp_f} degrees F</p>
            <p>Humidity: {areaWeather.data.current.temp_f} %</p>
            <p>Wind: {areaWeather.data.current.wind_mph} mph</p>
        </div>
        <Link className="btn area-home-btn" to={{pathname: `/areas/${area}`}}>Back to Area Home</Link>
    </div>

  );
}


export default AreaWeather;
