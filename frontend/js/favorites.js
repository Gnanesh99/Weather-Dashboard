const user=JSON.parse(localStorage.getItem("user"))

async function addFavorite(){

const city=document.getElementById("city").value

await fetch("http://localhost:5000/api/favorites/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

user_id:user.id,
city_name:city

})

})

loadFavorites()

}

async function loadFavorites(){

const response=await fetch(
"http://localhost:5000/api/favorites/"+user.id
)

const data=await response.json()

const list=document.getElementById("favoritesList")

list.innerHTML=""

data.forEach(city=>{

const li=document.createElement("li")

li.innerText=city.city_name

list.appendChild(li)

})

}

loadFavorites()