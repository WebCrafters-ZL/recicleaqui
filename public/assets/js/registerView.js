// Arquivo: public/assets/js/register.js

// Espera que o DOM seja carregado antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o checkbox "Sem Número" e o campo de entrada para o número
    const semNumeroCheckbox = document.getElementById("semNumero");
    const numeroInput = document.getElementById("numero");

    // Adiciona um ouvinte de evento para o checkbox "Sem Número" mudar
    semNumeroCheckbox.addEventListener("change", function () {
        // Verifica se o checkbox "Sem Número" está marcado
        if (semNumeroCheckbox.checked) {
            // Define o valor do campo de entrada para "S/N" e desabilita o campo
            numeroInput.value = "S/N";
            numeroInput.disabled = true;
        } else {
            // Limpa o valor do campo de entrada e habilita o campo
            numeroInput.value = "";
            numeroInput.disabled = false;
        }
    });
});
