let chart;
let skycons;

// initialize when page loads
window.onload = function () {
    skycons = new Skycons({ color: "white" });
    skycons.set("weatherIcon", Skycons.CLOUDY);
    skycons.play();
};
// ===============================
// SEARCH WEATHER BY CITY
// ===============================
async function getWeather(){

const city = document.getElementById("city").value;

if(!city){
alert("Please enter a city name");
return;
}

try{

// CURRENT WEATHER
const response = await fetch(
"/api/weather/current/" + city
);

const data = await response.json();

displayCurrentWeather(data);


// FORECAST WEATHER
const forecastResponse = await fetch(
"/api/weather/" + city
);

const forecastData = await forecastResponse.json();

createTempChart(forecastData);


// SHOW FORECAST SECTION
document.getElementById("forecastSection").style.display = "block";

}catch(error){

console.error(error);
alert("Error fetching weather");

}

}


// ===============================
// DISPLAY CURRENT WEATHER
// ===============================
function displayCurrentWeather(data){

// Hide welcome message
const welcome = document.getElementById("welcomeMessage");
if(welcome){
welcome.style.display = "none";
}

document.getElementById("cityName").innerText =
data.name + ", " + data.sys.country;

document.getElementById("description").innerText =
data.weather[0].description;

document.getElementById("temperature").innerText =
"Temperature: " + data.main.temp + " °C";

document.getElementById("feelsLike").innerText =
"Feels Like: " + data.main.feels_like + " °C";

document.getElementById("humidity").innerText =
"Humidity: " + data.main.humidity + "%";

document.getElementById("pressure").innerText =
"Pressure: " + data.main.pressure + " hPa";

document.getElementById("visibility").innerText =
"Visibility: " + (data.visibility/1000) + " km";

document.getElementById("wind").innerText =
"Wind Speed: " + data.wind.speed + " m/s";


const sunrise = new Date(data.sys.sunrise*1000).toLocaleTimeString();
const sunset = new Date(data.sys.sunset*1000).toLocaleTimeString();

document.getElementById("sunrise").innerText =
"Sunrise: " + sunrise;

document.getElementById("sunset").innerText =
"Sunset: " + sunset;


// WEATHER ANIMATION
setWeatherAnimation(data.weather[0].description);

}

// skycons is already initialized at the top of the file, so no need to redeclare here
skycons.play();

function setWeatherAnimation(condition){

condition = condition.toLowerCase();

let icon = Skycons.CLOUDY;

if(condition.includes("clear"))
icon = Skycons.CLEAR_DAY;

else if(condition.includes("cloud"))
icon = Skycons.CLOUDY;

else if(condition.includes("rain"))
icon = Skycons.RAIN;

else if(condition.includes("snow"))
icon = Skycons.SNOW;

else if(condition.includes("mist") || condition.includes("fog"))
icon = Skycons.FOG;

else if(condition.includes("wind"))
icon = Skycons.WIND;

// clear previous icon
skycons.remove("weatherIcon");

// set new icon
skycons.add("weatherIcon", icon);

}




// ===============================
// TEMPERATURE FORECAST CHART
// ===============================
function createTempChart(data){

const labels = [];
const temps = [];

// Take first 8 entries (24 hours)
for(let i=0;i<8;i++){

const item = data.list[i];

const time = new Date(item.dt * 1000);

labels.push(time.getHours() + ":00");

temps.push(item.main.temp);

}

const ctx = document.getElementById("tempChart");

if(chart){
chart.destroy();
}

chart = new Chart(ctx,{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Temperature °C",
data:temps,
borderColor:"#ffffff",
backgroundColor:"rgba(255,255,255,0.2)",
fill:true,
tension:0.4,
pointBackgroundColor:"#ffffff"
}]
},

options:{
responsive:true,
maintainAspectRatio:false,

plugins:{
legend:{
labels:{
color:"white"
}
}
},

scales:{
x:{
ticks:{color:"white"}
},
y:{
ticks:{color:"white"}
}
}

}

});

}


async function detectLocation(){

if(!navigator.geolocation){
alert("Geolocation is not supported by your browser");
return;
}

navigator.geolocation.getCurrentPosition(async position=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

try{

// CURRENT WEATHER
const weatherResponse = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=69aaabf4297c0befd02725b66da54467`
);

const weatherData = await weatherResponse.json();

displayCurrentWeather(weatherData);


// FORECAST WEATHER
const forecastResponse = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=69aaabf4297c0befd02725b66da54467`
);

const forecastData = await forecastResponse.json();

createTempChart(forecastData);


// show forecast section
document.getElementById("forecastSection").style.display = "block";

}catch(err){

console.error(err);
alert("Location weather failed");

}

});

}

// ===============================
// DARK MODE
// ===============================
function toggleDarkMode(){

document.body.classList.toggle("dark");

}