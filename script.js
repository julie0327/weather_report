let btn = document.querySelector(".go");

let left = document.querySelector(".left");
let wrapper = document.querySelector(".wrapper");
let right = document.querySelector(".right");
let input = document.querySelector(".search");
let botton = document.querySelector(".botton");

let cityName = input.value;
let APIKey = "aaa62c00179b2775dae73f49092440db";
function getWeather(format, showplace) {
  var api = `https://api.openweathermap.org/data/2.5/weather?q=San Diego&units=imperial&appid=${APIKey}`;
  if (format) {
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${format}&units=imperial&appid=${APIKey}`;
  }
  fetch(api)
    .then((response) => response.json())
    .then(function (data) {
      showplace.innerHTML = `
                <li>${dayjs().format("MM-DD-YYYY")}</li>
                <li>City: ${data.name}</li>
                <li>Temp: ${data.main.temp} ℉</li>
                <li>Wind: ${data.wind.speed} MPH</li>
                <li>Humidity: ${data.main.humidity}%</li>
                
      `;
      console.log(data);
    })
    .catch((err) => alert("Wrong city name!"));
}
getWeather("", left);

function forecastWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=imperial&date=5&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then(function (data) {
      botton.innerHTML = `
      <ul>
        <li>${data.list[0].dt_txt.replace("00:00:00", "")}</li>
        <li>City: ${data.city.name}</li>
        <li>Temp: ${data.list[0].main.temp} ℉</li>
        <li>Wind: ${data.list[0].wind.speed} MPH</li>
        <li>Humidity: ${data.list[0].main.humidity}%</li>
      </ul>
      <ul>
        <li>${data.list[8].dt_txt.replace("00:00:00", "")}</li>
        <li>City: ${data.city.name}</li>
        <li>Temp: ${data.list[8].main.temp} ℉</li>
        <li>Wind: ${data.list[8].wind.speed} MPH</li>
        <li>Humidity: ${data.list[8].main.humidity}%</li>
      </ul>
      <ul>
        <li>${data.list[16].dt_txt.replace("00:00:00", "")}</li>
        <li>City: ${data.city.name}</li>
        <li>Temp: ${data.list[16].main.temp} ℉</li>
        <li>Wind: ${data.list[16].wind.speed} MPH</li>
        <li>Humidity: ${data.list[16].main.humidity}%</li>
      </ul>
      <ul>
        <li>${data.list[24].dt_txt.replace("00:00:00", "")}</li>
        <li>City: ${data.city.name}</li>
        <li>Temp: ${data.list[24].main.temp} ℉</li>
        <li>Wind: ${data.list[24].wind.speed} MPH</li>
        <li>Humidity: ${data.list[24].main.humidity}%</li>
      </ul>
      <ul>
        <li>${data.list[32].dt_txt.replace("00:00:00", "")}</li>
        <li>City: ${data.city.name}</li>
        <li>Temp: ${data.list[32].main.temp} ℉</li>
        <li>Wind: ${data.list[32].wind.speed} MPH</li>
        <li>Humidity: ${data.list[32].main.humidity}%</li>
      </ul>
  `;
    });
}

btn.addEventListener("click", function () {
  getWeather(input.value, right);
  forecastWeather();
});
