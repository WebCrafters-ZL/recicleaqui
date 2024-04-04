document.addEventListener("DOMContentLoaded", function () {
    const semNumeroCheckbox = document.getElementById("semNumero");
    const numeroInput = document.getElementById("numero");

    semNumeroCheckbox.addEventListener("change", function () {
        if (semNumeroCheckbox.checked) {
            numeroInput.value = "S/N";
            numeroInput.disabled = true;
        } else {
            numeroInput.value = "";
            numeroInput.disabled = false;
        }
    });
});
