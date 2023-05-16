const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const  pass = urlParams.get('password')

if(!pass || pass != "JWB-VIP"){
    document.getElementById("accessde").style.display = "block";
}
else {
    win = window.location.href.split("/")
    window.location.href = window.location.href.replace(win[win.length-1], "perfect.html")
}