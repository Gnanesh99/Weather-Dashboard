async function register(){

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("/api/auth/register", {
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ username, email, password })
});

const data = await response.json();

if(response.ok){
alert("Registered successfully");
window.location.href = "/login.html";
}else{
alert(data.message);
}

}catch(err){
console.error(err);
alert("Register failed");
}

}