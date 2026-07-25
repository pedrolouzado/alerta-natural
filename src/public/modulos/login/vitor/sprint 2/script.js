const preferencias = document.querySelectorAll(".preferencia");
const mensagem = document.getElementById("mensagem");

function atualizarPreferencias() {

    const selecionadas = [];

    preferencias.forEach((preferencia) => {

        if (preferencia.checked) {
            const texto = preferencia
                .nextElementSibling
                .textContent
                .trim();

            selecionadas.push(texto);
        }

    });

    if (selecionadas.length > 0) {

        mensagem.classList.remove("d-none");

        mensagem.textContent =
            "Preferências ativas: " + selecionadas.join(", ");

    } else {

        mensagem.classList.add("d-none");

        mensagem.textContent = "";

    }

}

preferencias.forEach((preferencia) => {

    preferencia.addEventListener("change", atualizarPreferencias);

})