document.getElementById("submit").addEventListener("click", function (event) 
 {event.preventDefault()
});
function tnt(){
  window.alert("WEBPAGE ERASING!!!");
  document.write("<h1>Error 404. Page not found</h1>");
}
function checkPassword(){
  var password = "simsim";
  var input = document.getElementById("password").value;
 if (password!=input){window.alert("Wrong password")}
 else {tnt()}
 
  
}
  