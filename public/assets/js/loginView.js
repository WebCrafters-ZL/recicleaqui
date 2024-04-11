// Arquivo: public/assets/js/login.js

// Espera que o DOM seja carregado antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os elementos HTML relevantes
  const loginForm = document.querySelector(".login-form");
  const recoverForm = document.querySelector(".recover-form");
  const loginLink = document.querySelector("#loginLink");
  const recoverLink = document.querySelector("#recoverLink");

  // Adiciona um ouvinte de evento para alternar para o formulário de login
  loginLink.addEventListener("click", function () {
    loginForm.classList.add("show"); // Mostra o formulário de login
    recoverForm.classList.remove("show"); // Esconde o formulário de recuperação de senha
  });

  // Adiciona um ouvinte de evento para alternar para o formulário de recuperação de senha
  recoverLink.addEventListener("click", function () {
    recoverForm.classList.add("show"); // Mostra o formulário de recuperação de senha
    loginForm.classList.remove("show"); // Esconde o formulário de login
  });

  // Mostra o formulário de login por padrão quando a página é carregada
  loginForm.classList.add("show");
});
