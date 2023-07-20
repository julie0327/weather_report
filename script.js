let btn = document.querySelector(".go");
let right = document.querySelector(".right");
let weather_display = document.querySelector(".weather_display");
let input=document.querySelector('.search')

btn.addEventListener("click", function () {
  right.appendChild(weather_display);
  weather_display.innerHTML = `
               ${getWeather()}
  `
});
let cityName = input.value
let APIKey='aaa62c00179b2775dae73f49092440db'
let weatherAPI=`https://api.openweathermap.org/data/2.5/weather?q=London&units=meric&appid=${APIKey}`
function getWeather() { 
  console.log(cityName);
  fetch(weatherAPI)
    .then(response => response.json())
    .then(function (data) { 
      weather_display.innerHTML = `
                <li>${dayjs().format('MM-DD-YYYY')}</li>
                <li>City: ${data.name}</li>
                <li>Temp: ${data.main.temp}</li>
                <li>Wind: ${data.wind.speed} MPH</li>
                <li>Humidity: ${data.main.humidity}</li>
                
      `
      console.log(data);
    })
  .catch(err=>alert('Wrong city name!'))
}
