let go = document.querySelector(".go");
let search = document.querySelector(".search");
let wrapper = document.querySelector(".wrapper");
let current = document.querySelector(".current");
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
    inputData.weather[0].main = '<i class="material-icons">thunderstrom</i>';
  } else if (inputData.weather[0].main === "Haze") {
    inputData.weather[0].main = '<i class="material-icons">dehaze</i>';
  } else if (inputData.weather[0].main === "Fog") {
    inputData.weather[0].main = '<i class="material-icons">foggy</i>';
  } else if (inputData.weather[0].main === "Mist") {
    inputData.weather[0].main = '<span class="material-symbols-outlined">mist</span>';
  } 
}

//get current weather that the place from the search box
function getCurrentWeather(format){ 
  var api = `https://api.openweathermap.org/data/2.5/weather?q=${format}&units=imperial&appid=${APIKey}`;
  fetch(api)
    .then(function (response) {
      if (!response.ok) {
        alert ('Error: '+response.statusText)
        } else { 
        response.json().then(
          function (data) { 
           // saveHistory(data.name)
            getICONS(data);
      console.log(data);     
        current.innerHTML = `
                <li>${dayjs().format("MM-DD-YYYY")}</li>
                <li>City: ${data.name}</li>
                <li>${data.weather[0].main}</li>
                <li>Temp: ${data.main.temp} ℉</li>
                <li>Wind: ${data.wind.speed} MPH</li>
                <li>Humidity: ${data.main.humidity}%</li>
      `;
        console.log(data);
        })
      }
    })
}

//get the weather forecast for the next 5 days
function forecastWeather(val) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${val}&units=imperial&date=5&appid=${APIKey}`
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
          } else if (data.list[i].weather[0].main === "Mist") {
            data.list[i].weather[0].main = '<i class="material-icons">mist</i>';
          } else if (data.list[i].weather[0].main === "Snow") {
            data.list[i].weather[0].main =
              '<i class="material-icons">snowing</i>';
          }
          console.log(i);
          bottom.innerHTML += `
          <ul class='five_day_weather'>
          <li>${data.list[list[i]].dt_txt.substring(0, 10)}</li>
          <li>City: ${data.city.name}</li>
          <li>${data.list[i].weather[0].main}</li>
          <li>Temp: ${data.list[i].main.temp} ℉</li>
          <li>Wind: ${data.list[i].wind.speed} MPH</li>
          <li>Humidity: ${data.list[i].main.humidity}%</li>
          </ul>
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
      <li>${citydata[i]}</li>
      `;
    }
    //click history to show 5 days weather
    let lis = document.querySelectorAll("li");
    lis.forEach(function (theBtn, index) {
      theBtn.addEventListener("click", function () {
        bottom.innerHTML = "";
        forecastWeather(citydata[index]);
        getCurrentWeather(citydata[index])
      });
    });
  }
}
getHistory()

//save the city to localstorage
// function saveHistory(val) {
//   let citydata = JSON.parse(localStorage.getItem("citydata")) || [];
//   //let city = val;
//   citydata.push(val);
//   localStorage.setItem("citydata", JSON.stringify(citydata));
// }

//click event that display the search result on the page
go.addEventListener("click", function () {
  current.textContent = '';
  bottom.textContent = "";
  getCurrentWeather(input.value);
  forecastWeather(input.value);
  //saveHistory();

  //clear the value in input box after submitting
  search.value = "";

  //render the city from the localstorage on the page
  let citydata = JSON.parse(localStorage.getItem("citydata")) || [];
  searchHistory.innerHTML += `
    <li>${citydata[citydata.length - 1]}</li>
    `;

  let lis = document.querySelectorAll("li");
    lis.forEach(function (theBtn, index) {
      theBtn.addEventListener("click", function () {
        console.log("!!!!!!");
        bottom.innerHTML = "";
        forecastWeather(citydata[index]);
        getCurrentWeather(citydata[index])
      });
    });
  });
