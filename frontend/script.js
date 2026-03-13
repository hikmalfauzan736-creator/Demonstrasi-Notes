const API = "http://localhost:5000/api";

function register(){

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

fetch(API + "/auth/register", {

method: "POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({username,email,password})

})
.then(res => res.json())
.then(data => {

alert("Register berhasil");
window.location = "login.html";

})
.catch(err => console.log(err));

}

function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

fetch(API + "/auth/login", {

method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({email,password})

})
.then(res => res.json())
.then(data => {

localStorage.setItem("token",data.token);
window.location = "index.html";

})
.catch(err => console.log(err));

}

function logout(){

localStorage.removeItem("token");
window.location = "login.html";

}

function getNotes(){

fetch(API + "/notes",{
headers:{
Authorization:"Bearer " + localStorage.getItem("token")
}
})
.then(res => res.json())
.then(data => {

console.log(data);

const list = document.getElementById("notesList");
list.innerHTML="";

data.forEach(note => {

const li = document.createElement("li");

li.innerHTML =
note.title+" - "+note.content+
" <button onclick='deleteNote(\""+note._id+"\")'>Delete</button>";

list.appendChild(li);

});

});

}

function createNote(){

const title = document.getElementById("title").value;
const content = document.getElementById("content").value;

fetch(API + "/notes",{

method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:"Bearer " + localStorage.getItem("token")
},
body: JSON.stringify({title,content})

})
.then(res => res.json())
.then(data => {

alert("Note berhasil ditambahkan");

document.getElementById("title").value = "";
document.getElementById("content").value = "";

getNotes();

})
.catch(err => console.log(err));

}

function deleteNote(id){

fetch(API + "/notes/" + id,{

method:"DELETE",
headers:{
Authorization:"Bearer " + localStorage.getItem("token")
}

})
.then(res => res.json())
.then(data => {

getNotes();

})
.catch(err => console.log(err));

}

window.onload = function(){

if(document.getElementById("notesList")){
getNotes();
}

}