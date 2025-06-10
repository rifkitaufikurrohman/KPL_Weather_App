import config from "../../config.js";
let currentLang = "en"; // Default language
import { fetchData } from "./apiFunction.js";

// fatch data

const WEATHER_ASSETS = [
  {
    condition: "Patchy light rain in area with thunder",
    video: "../../assets/vid/thunder.mp4",
  },
  { condition: "Light rain shower", video: "../../assets/vid/rain.mp4" },
  {
    condition: "Moderate or heavy rain shower",
    video: "../../assets/vid/rain.mp4",
  },
  { condition: "Sunny", video: "../../assets/vid/sunny.mp4" },
  { condition: "Snow", video: "../../assets/vid/snow.mp4" },
  { condition: "Partly cloudy", video: "../../assets/vid/partly-cloudy-2.mp4" },
];

const DEFAULT_ASSESTS = "../../assets/vid/sunny.mp4";

async function getVideoCondition(condition) {
  // console.log(WEATHER_ASSETS.)
  const match = WEATHER_ASSETS.find(
    (e) => e.condition.toLowerCase() === condition.toLowerCase()
  );

  // const match = WEATHER_ASSETS.find((e) => {
  //   e.condition.toLowerCase() === condition.toLowerCase();
  // });
  return match ? match.video : DEFAULT_ASSESTS;
}

async function start(search = "indonesia") {
  const apiURL = await fetchData(
    `${config.BASE_URL}/v1/current.json?key=5209e4908b634703875140521243007&q=${search}&aqi=no`
  );
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

// search
var coocies = localStorage.getItem("region");
if (!coocies) {
  localStorage.setItem("region", config.LOCATION);
}
var coocies = localStorage.getItem("region");

const form_search = document.querySelector(".form");
const input_search = document.getElementById("search");

form_search.addEventListener("submit", (e) => {
  e.preventDefault();
  let search = input_search.value;
  localStorage.setItem("region", search);
  coocies = localStorage.getItem("region");
  start(coocies);
  input_search.value = "";
});

// translate

function setLanguage(language) {
  // Update the current language
  currentLang = language;

  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = config.translations[currentLang][key];

    if (translation) {
      element.textContent = translation;
    }
  });

  document.documentElement.lang = currentLang;

  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const translation = config.translations[currentLang][key];

    if (translation) {
      element.setAttribute("placeholder", translation);
    }
  });
}

// Set the initial language
setLanguage(currentLang);

// Set the event listeners for language buttons
document.querySelectorAll(".language-button-en").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.getAttribute("data-lang");
    setLanguage(language);
  });
});

// Set the event listeners for language buttons
document.querySelectorAll(".language-button-id").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.getAttribute("data-lang");
    setLanguage(language);
  });
});

setInterval(() => {
  start(coocies);
}, 50000);
start(coocies);

export { start };
