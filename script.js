let btn = document.querySelector(".go");
let left = document.querySelector(".left");
let wrapper = document.querySelector(".wrapper");
let right = document.querySelector(".right");
let input = document.querySelector(".search");
let botton = document.querySelector(".botton");
let searchHistory = document.querySelector("li");

let cityName = input.value;
let APIKey = "aaa62c00179b2775dae73f49092440db";

//get local weather and the place from the search box
function getWeather(format, showplace) {
  var api = `https://api.openweathermap.org/data/2.5/weather?q=San Diego&units=imperial&appid=${APIKey}`;
  if (format) {
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${format}&units=imperial&appid=${APIKey}`;
  }
  fetch(api)
    .then((response) => response.json())
    .then(function (data) {
      if (data.weather[0].main === "Clouds") {
        data.weather[0].main = `<i class="material-icons">clouds</i>`;
      } else if (data.weather[0].main === "Clear") {
        data.weather[0].main = `<i class="material-icons">sunny</i>`;
      } else if (data.weather[0].main === "rain") {
        data.weather[0].main = `<i class="material-icons">rainy</i>`;
      }
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

// get the weather forecast for the next 5 days
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
          console.log(i);
          botton.innerHTML += `<ul>
          <li>${data.list[list[i]].dt_txt.replace("00:00:00", "")}</li>
          <li>City: ${data.city.name}</li>
          <li>Temp: ${data.list[i].main.temp} ℉</li>
          <li>Wind: ${data.list[i].wind.speed} MPH</li>
          <li>Humidity: ${data.list[i].main.humidity}%</li>
        </ul>`;
          // var weather = {
          //   date: data.list[list[i]].dt_txt.replace("00:00:00", ""),
          //   city: data.city.name,
          //   temp: data.list[i].main.temp,
          //   wind: data.list[i].wind.speed,
          //   humidity: data.list[i].main.humidity,
          // };
          // localStorage.setItem("weather", JSON.stringify(weather));

          // let searchCity = {
          //   cityname: input.value,
          // };
          // localStorage.setItem("searchCity", JSON.stringify(searchCity));
          // let getHistory = JSON.parse(localStorage.getItem("searchCity"));
          // wrapper.appendChild(searchHistory);
          // searchHistory.innerHTML = getHistory.cityname;
        }
      }
      loopweather();
    });
}

//click event that display the search result on the page
btn.addEventListener("click", function () {
  getWeather(input.value, right);
  forecastWeather();
});
