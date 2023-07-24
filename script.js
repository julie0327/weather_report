let btn = document.querySelector(".go");
let search = document.querySelector(".search");
let left = document.querySelector(".left");
let wrapper = document.querySelector(".wrapper");
let right = document.querySelector(".right");
let input = document.querySelector(".search");
let bottom = document.querySelector(".bottom");
let searchHistory = document.querySelector(".history");

let cityName = input.value;
let APIKey = "aaa62c00179b2775dae73f49092440db";

//get weather ICONS
function getICONS(inputData) {
  if (inputData.weather[0].main === "Clouds") {
    inputData.weather[0].main = '<i class="material-icons">clouds</i>';
  } else if (inputData.weather[0].main === "Clear") {
    inputData.weather[0].main = '<i class="material-icons">sunny</i>';
  } else if (inputData.weather[0].main === "Rain") {
    inputData.weather[0].main = '<i class="material-icons">Rainy</i>';
  } else if (inputData.weather[0].main === "Haze") {
    inputData.weather[0].main = '<i class="material-icons">dehaze</i>';
  }
}

//get local weather and the place from the search box
function getWeather(format, showplace) {
  var api = `https://api.openweathermap.org/data/2.5/weather?q=San Diego&units=imperial&appid=${APIKey}`;
  if (format) {
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${format}&units=imperial&appid=${APIKey}`;
  }
  fetch(api)
    .then((response) => response.json())
    .then(function (data) {
      getICONS(data);
      showplace.innerHTML = `
                <li>${dayjs().format("MM-DD-YYYY")}</li>
                <li>City: ${data.name}</li>
                <li>${data.weather[0].main}</li>
                <li>Temp: ${data.main.temp} ℉</li>
                <li>Wind: ${data.wind.speed} MPH</li>
                <li>Humidity: ${data.main.humidity}%</li>
      `;
      console.log(data);
    })
    .catch((err) => alert("Wrong city name!"));
}
getWeather("", left);

//get the weather forecast for the next 5 days
function forecastWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=imperial&date=5&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);

      function loopweather() {
        let list = [0, 8, 16, 24, 32];
        for (let i = 0; i < list.length; i++) {
          if (data.list[i].weather[0].main === "Clouds") {
            data.list[i].weather[0].main =
              '<i class="material-icons">clouds</i>';
          } else if (data.list[i].weather[0].main === "Clear") {
            data.list[i].weather[0].main =
              '<i class="material-icons">sunny</i>';
          } else if (data.list[i].weather[0].main === "Rain") {
            data.list[i].weather[0].main =
              '<i class="material-icons">thunderstorm</i>';
          } else if (data.list[i].weather[0].main === "Haze") {
            data.list[i].weather[0].main =
              '<i class="material-icons">dehaze</i>';
          }
          console.log(i);
          bottom.innerHTML += `
          <li>${data.list[list[i]].dt_txt.substring(0, 10)}</li>
          <li>City: ${data.city.name}</li>
          <li>${data.list[i].weather[0].main}</li>
          <li>Temp: ${data.list[i].main.temp} ℉</li>
          <li>Wind: ${data.list[i].wind.speed} MPH</li>
          <li>Humidity: ${data.list[i].main.humidity}%</li>
          `;
        }
      }
      loopweather();
    });
}

//keep the city after reload the page
function getHistory() {
  let citydata = JSON.parse(localStorage.getItem("citydata")) || [];
  if (citydata) {
    for (let i = 0; i < citydata.length; i++) {
      searchHistory.innerHTML += `
      <li><a href=''>${citydata[i]}</a></li>
      `;
    }
  }
}
getHistory();

//save the city to localstorage
function saveHistory() {
  let citydata = JSON.parse(localStorage.getItem("citydata")) || [];
  let city = input.value;
  citydata.push(city);
  localStorage.setItem("citydata", JSON.stringify(citydata));
}

//click event that display the search result on the page
btn.addEventListener("click", function () {
  // search.placeholder=''
  bottom.textContent = "";
  getWeather(input.value, right);
  forecastWeather();
  saveHistory();

  //render the city from the localstorage on the page
  let citydata = JSON.parse(localStorage.getItem("citydata")) || [];
  searchHistory.innerHTML += `
    <li>${citydata[citydata.length - 1]}</li>
    `;
});
