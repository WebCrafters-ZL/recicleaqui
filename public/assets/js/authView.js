let redefinirLink = document.querySelector("#redefinir-link");
let loginLink = document.querySelector("#login-link");
let formularioLogin = document.querySelector(".formulario-login");
let formularioRedefinir = document.querySelector(".formulario-redefinicao");

redefinirLink.addEventListener("click", function () {
    formularioLogin.classList.remove("show");
    formularioRedefinir.classList.add("show");
})

loginLink.addEventListener("click", function () {
    formularioRedefinir.classList.remove("show");
    formularioLogin.classList.add("show");
})