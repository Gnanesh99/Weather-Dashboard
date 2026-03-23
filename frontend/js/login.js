async function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("/api/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ email, password })
});

const data = await response.json();

if(response.ok){

localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

window.location.href = "/dashboard.html";

}else{
alert(data.message);
}

}catch(err){
console.error(err);
alert("Login failed");
}

}