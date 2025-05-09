import config from "../../config.js";
let currentLang = "en"; // Default language
import { fetchData } from "./apiFunction.js";

// fatch data

const WEATHER_ASSETS = [
  { condition: "Patchy light rain in area with thunder", video: "../../assets/vid/thunder.mp4" },
  { condition: "Light rain shower", video: "../../assets/vid/rain.mp4" },
  { condition: "Moderate or heavy rain shower", video: "../../assets/vid/rain.mp4" },
  { condition: "Sunny", video: "../../assets/vid/sunny.mp4" },
  { condition: "Snow", video: "../../assets/vid/snow.mp4" },
  { condition: "Partly cloudy", video: "../../assets/vid/partly-cloudy-2.mp4" },
];

const DEFAULT_ASSESTS = "../../assets/vid/sunny.mp4";

async function getVideoCondition(condition) {
  // console.log(WEATHER_ASSETS.)
  const match = WEATHER_ASSETS.find((e) => e.condition.toLowerCase() === condition.toLowerCase());

  // const match = WEATHER_ASSETS.find((e) => {
  //   e.condition.toLowerCase() === condition.toLowerCase();
  // });
  return match ? match.video : DEFAULT_ASSESTS;
}

async function start(search = "indonesia") {
  const apiURL = await fetchData(`${config.BASE_URL}/v1/current.json?key=5209e4908b634703875140521243007&q=${search}&aqi=no`);
  const location = await apiURL.location;
  const current = await apiURL.current;
  // change backgorund :
  const weather_background = document.querySelector("#video-background source");
  const weather = current.condition.text;
  console.log(weather);
  const video = await getVideoCondition(weather);
  weather_background.src = `${video}`;

  const background_video = document.getElementById("video-background");
  background_video.load();
  background_video.play();

  //   main information
  const country = document.querySelector(".country");
  const time = document.querySelector(".time");
  const temperature = document.querySelector(".temperature");
  const main_icon = document.querySelector(".main-icon img");
  country.textContent = location.country + " / " + location.name;
  time.textContent = location.localtime;
  temperature.textContent = current.temp_c + "°c";
  main_icon.src = current.condition.icon;

  //   additional information
  const condition_text = document.querySelector(".condition-text");
  const temperature_additional = document.querySelector(".temp .value span");
  const feels = document.querySelector(".feels .value span");
  const humidity = document.querySelector(".humidity .value span");
  const cloudy = document.querySelector(".cloudy .value span");
  const wind = document.querySelector(".wind .value span");
  condition_text.textContent = current.condition.text;
  temperature_additional.textContent = current.temp_c + "°c";
  feels.textContent = current.feelslike_c + "°c";
  humidity.textContent = current.humidity + "°%";
  cloudy.textContent = current.cloud + "%";
  wind.textContent = current.wind_kph + "km/h";
}