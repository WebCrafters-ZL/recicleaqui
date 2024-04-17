// Arquivo: public/assets/js/register.js

(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated');
        }, false);
    })
})()

const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');

confirmarSenhaInput.addEventListener('input', function () {
    if (senhaInput.value !== confirmarSenhaInput.value) {
        confirmarSenhaInput.setCustomValidity('invalid');
        confirmarSenhaInput.classList.add('is-invalid');
        confirmarSenhaInput.parentElement.querySelector('.password-mismatch-feedback').classList.add('d-block');
    } else {
        confirmarSenhaInput.setCustomValidity('');
        confirmarSenhaInput.classList.remove('is-invalid');
        confirmarSenhaInput.parentElement.querySelector('.password-mismatch-feedback').classList.remove('d-block');
    }
});

const checkbox = document.getElementById('semNumero');
const numeroInput = document.getElementById('numero');

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        numeroInput.disabled = true;
        numeroInput.value = '';
        numeroInput.removeAttribute('required');
    } else {
        numeroInput.disabled = false;
        numeroInput.setAttribute('required', true);
    }
});
