document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");
  const recoverForm = document.querySelector(".recover-form");
  const loginLink = document.querySelector("#loginLink");
  const recoverLink = document.querySelector("#recoverLink");

  loginLink.addEventListener("click", function () {
    loginForm.classList.add("show");
    recoverForm.classList.remove("show");
  });

  recoverLink.addEventListener("click", function () {
    recoverForm.classList.add("show");
    loginForm.classList.remove("show");
  });

  loginForm.classList.add("show");
});
