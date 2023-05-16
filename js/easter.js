const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const  pass = urlParams.get('password')

if(pass != "easter" || !pass){
    document.getElementById("accessde").style.display = "block";
}
else {
    window.location.href = "/perfect.html";
}