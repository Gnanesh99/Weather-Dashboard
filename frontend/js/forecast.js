let forecastChart

async function getForecast(){

const city=document.getElementById("city").value

const response=await fetch(
"/api/weather/forecast/"+city
)

const data=await response.json()

const labels=[]
const temps=[]

data.list.slice(0,10).forEach(item=>{

const date=new Date(item.dt*1000)

labels.push(date.getHours()+":00")

temps.push(item.main.temp)

})

createChart(labels,temps)

}

function createChart(labels,data){

const ctx=document.getElementById("forecastChart")

if(forecastChart){
forecastChart.destroy()
}

forecastChart=new Chart(ctx,{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Temperature °C",
data:data,
borderColor:"blue",
fill:true
}]
}

})

}