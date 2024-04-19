const cnpjInput = document.getElementById("cnpj");
const cepInput = document.getElementById("cep");
const checkbox = document.getElementById("semNumero");
const numeroInput = document.getElementById("numero");
const confirmarSenhaInput = document.getElementById("confirmarSenha");
const senhaInput = document.getElementById("senha");
const razaoSocialInput = document.getElementById("razaoSocial");
const nomeFantasiaInput = document.getElementById("nomeFantasia");
const logradouroInput = document.getElementById("logradouro");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const estadoInput = document.getElementById("estado");
const telefoneEmpresaInput = document.getElementById("telefoneEmpresa");
const telefoneResponsavelInput = document.getElementById("telefoneResponsavel");

(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // Remover as máscaras antes de enviar os dados
        cnpjInput.value = removerMascara(cnpjInput.value);
        cepInput.value = removerMascara(cepInput.value);

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  aplicarMascaras();

  cnpjInput.addEventListener("change", function () {
    const cnpj = removerMascara(cnpjInput.value);
    buscarDadosCNPJ(
      cnpj,
      razaoSocialInput,
      nomeFantasiaInput,
      cepInput,
      logradouroInput,
      bairroInput,
      cidadeInput,
      estadoInput
    );
  });

  cepInput.addEventListener("change", function () {
    const cep = removerMascara(cepInput.value);
    buscarDadosCEP(cep, logradouroInput, bairroInput, cidadeInput, estadoInput);
  });

  confirmarSenhaInput.addEventListener("input", function () {
    if (senhaInput.value !== confirmarSenhaInput.value) {
      confirmarSenhaInput.setCustomValidity("invalid");
      confirmarSenhaInput.classList.add("is-invalid");
      confirmarSenhaInput.parentElement
        .querySelector(".password-mismatch-feedback")
        .classList.add("d-block");
    } else {
      confirmarSenhaInput.setCustomValidity("");
      confirmarSenhaInput.classList.remove("is-invalid");
      confirmarSenhaInput.parentElement
        .querySelector(".password-mismatch-feedback")
        .classList.remove("d-block");
    }
  });

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      numeroInput.disabled = true;
      numeroInput.value = "";
      numeroInput.removeAttribute("required");
    } else {
      numeroInput.disabled = false;
      numeroInput.setAttribute("required", true);
    }
  });
});

function aplicarMascaras() {
  // Máscara para CNPJ
  $("#cnpj").mask("00.000.000/0000-00", { reverse: true });

  // Máscara para CEP
  $("#cep").mask("00000-000");

  // Máscara para telefone da empresa
  $("#telefoneEmpresa").mask("(00) 0000-0000");

  // Máscara para telefone do responsável
  $("#telefoneResponsavel").mask("(00) 0000-0000");
}

function buscarDadosCNPJ(
  cnpj,
  razaoSocialInput,
  nomeFantasiaInput,
  cepInput,
  logradouroInput,
  bairroInput,
  cidadeInput,
  estadoInput
) {
  return fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do CNPJ");
      }
      return response.json();
    })
    .then((data) => {
      razaoSocialInput.value = data.razao_social;
      nomeFantasiaInput.value = data.nome_fantasia;
      cepInput.value = data.cep; // Remover a máscara do CEP antes de preencher o campo
      // Após preencher o campo de CEP, chama a função para buscar os dados do CEP
      buscarDadosCEP(
        removerMascara(data.cep),
        logradouroInput,
        bairroInput,
        cidadeInput,
        estadoInput
      );
    })
    .catch((error) => {
      alert("Não foi possível encontrar a empresa para o CNPJ fornecido.");
      console.error("Erro:", error);
    });
}

function buscarDadosCEP(
  cep,
  logradouroInput,
  bairroInput,
  cidadeInput,
  estadoInput
) {
  return fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do CEP");
      }
      return response.json();
    })
    .then((data) => {
      logradouroInput.value = data.street;
      bairroInput.value = data.neighborhood;
      cidadeInput.value = data.city;
      estadoInput.value = data.state;
    })
    .catch((error) => {
      alert("Não foi possível encontrar o endereço para o CEP fornecido.");
      console.error("Erro:", error);
    });
}

function removerMascara(valor) {
  return valor.replace(/\D/g, "");
}
