const caixasDeAlerta = document.querySelectorAll(".alerta");

const aviso = document.getElementById("mensagem");


caixasDeAlerta.forEach(function (caixa) {

  caixa.addEventListener("change", function () {

    let alertasMarcados = [];

    caixasDeAlerta.forEach(function (item) {

      if (item.checked) {

        alertasMarcados.push(item.value);

      }

    });

    console.log("Opções selecionadas:");
    console.log(alertasMarcados);

    mostrarMensagem(alertasMarcados);

  });

});


function mostrarMensagem(lista) {

  aviso.classList.remove("d-none");

  if (lista.length > 0) {

    aviso.innerHTML =
      "Selecionados: " + lista.join(", ");

  } else {

    aviso.innerHTML =
      "Nenhuma opção selecionada.";

  }

  setTimeout(function () {

    aviso.classList.add("d-none");

  }, 2000);

}