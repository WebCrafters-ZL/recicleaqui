var loginLink = document.querySelector("#login");
var recoverLink = document.querySelector("#recover");

var body = document.querySelector("body");

loginLink.addEventListener("click", function () {
  body.className = "login-js";
});

recoverLink.addEventListener("click", function () {
  body.className = "recover-js";
});
