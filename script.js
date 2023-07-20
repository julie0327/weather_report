let btn = document.querySelector(".go");
let right = document.querySelector(".right");
let left=document.querySelector('.left')
let weather_display = document.querySelector(".weather_display");
let input=document.querySelector('.search')

btn.addEventListener("click", function () {
  getWeather()
});
let cityName = input.value
let APIKey='aaa62c00179b2775dae73f49092440db'
function getWeather() { 
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=meric&appid=${APIKey}`)
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

function localWeather() { 
  let apiKey=`https://api.openweathermap.org/data/2.5/weather?q=San Diego&units=meric&appid=${APIKey}`
  fetch(apiKey)
    .then(response => response.json())
    .then(function (data) { 
      left.innerHTML = `
                <li>${dayjs().format('MM-DD-YYYY')}</li>
                <li>City: ${data.name}</li>
                <li>Temp: ${data.main.temp}</li>
                <li>Wind: ${data.wind.speed} MPH</li>
                <li>Humidity: ${data.main.humidity}</li>   
      `
  })
}
localWeather()