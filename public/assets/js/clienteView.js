let btnEditar = document.querySelector("#habilita-edicao");
let form = document.querySelector("form");

function habilitaEdicao() {
  btnEditar.addEventListener("click", function () {
    // Seleciona todos os elementos dentro do formulário
    let elementosForm = form.querySelectorAll(
      "input, select, textarea, button"
    );

    // Itera sobre cada elemento do formulário
    elementosForm.forEach((elemento) => {
      // Remove os atributos readonly e disabled
      elemento.removeAttribute("readonly");
      elemento.removeAttribute("disabled");
    });
  });
}
