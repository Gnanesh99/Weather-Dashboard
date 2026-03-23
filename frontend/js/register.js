async function register(){

console.log("REGISTER CLICKED");  // 🔥 add this

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

console.log("Sending request...");  // 🔥

const response = await fetch("/api/auth/register", {
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ username, email, password })
});

console.log("Response received:", response);  // 🔥

const data = await response.json();
console.log("Data:", data);  // 🔥

if(response.ok){
alert("Registered successfully");
window.location.href = "/login.html";
}else{
alert(data.message);
}

}catch(err){
console.error("ERROR:", err);
alert("Register failed");
}

}