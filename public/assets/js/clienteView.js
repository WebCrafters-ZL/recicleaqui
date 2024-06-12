(() => {
  "use strict";

  // SPMaskBehavior function
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  };

  // spOptions object
  var spOptions = {
    onKeyPress: function (val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
  };

  const registerForm = document.getElementById("registerForm");
  const cnpjInput = document.getElementById("cnpj");
  const razaoSocialInput = document.getElementById("razaoSocial");
  const nomeFantasiaInput = document.getElementById("nomeFantasia");
  const cepInput = document.getElementById("cep");
  const logradouroInput = document.getElementById("logradouro");
  const numeroInput = document.getElementById("numero");
  const checkbox = document.getElementById("semNumero");
  const complementoInput = document.getElementById("complemento");
  const bairroInput = document.getElementById("bairro");
  const cidadeInput = document.getElementById("cidade");
  const estadoInput = document.getElementById("estado");
  const telefoneEmpresaInput = document.getElementById("telefoneEmpresa");
  const telefoneResponsavelInput = document.getElementById("telefoneResponsavel");
  const confirmarSenhaInput = document.getElementById("confirmarSenha");
  const senhaInput = document.getElementById("senha");

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  document.addEventListener("DOMContentLoaded", function () {
    aplicarMascaras();

    cnpjInput.addEventListener("change", function () {
      buscarDadosCNPJ($('#cnpj').cleanVal());
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

    registerForm.addEventListener("submit", function (event) {
      $("#cnpj").unmask();
      $("#cep").unmask();
      $("#telefoneEmpresa").unmask();
      $("#telefoneResponsavel").unmask();
    });
  });

  function aplicarMascaras() {
    $("#cnpj").mask("00.000.000/0000-00", { reverse: true });
    $("#cep").mask("00000-000");
    $("#telefoneEmpresa").mask(SPMaskBehavior, spOptions); // Applying SPMaskBehavior to telefoneEmpresaInput
    $("#telefoneResponsavel").mask(SPMaskBehavior, spOptions); // Applying SPMaskBehavior to telefoneResponsavelInput
  }

  async function buscarDadosCNPJ(cnpj) {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do CNPJ");
      }
      const data = await response.json();
      razaoSocialInput.value = data.razao_social;
      nomeFantasiaInput.value = data.nome_fantasia;
      cepInput.value = data.cep;
      logradouroInput.value = data.descricao_tipo_de_logradouro + " " + data.logradouro;
      numeroInput.value = data.numero;
      complementoInput.value = data.complemento;
      bairroInput.value = data.bairro;
      cidadeInput.value = data.municipio;
      estadoInput.value = data.uf;
      telefoneEmpresaInput.value = data.ddd_telefone_1;
    } catch (error) {
      alert("Não foi possível encontrar a empresa para o CNPJ fornecido.");
      console.error("Erro:", error);
    }
  }
})();
