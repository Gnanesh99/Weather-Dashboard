async function getAQI(){

const lat=document.getElementById("lat").value
const lon=document.getElementById("lon").value

const API="YOUR_OPENWEATHER_API_KEY"

const response=await fetch(
`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API}`
)

const data=await response.json()

const aqi=data.list[0]

document.getElementById("aqiData").innerHTML=

`
<p>AQI: ${aqi.main.aqi}</p>
<p>PM2.5: ${aqi.components.pm2_5}</p>
<p>PM10: ${aqi.components.pm10}</p>
<p>CO: ${aqi.components.co}</p>
<p>SO2: ${aqi.components.so2}</p>
<p>O3: ${aqi.components.o3}</p>
`

}