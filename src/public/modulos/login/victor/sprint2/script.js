const enviar =
    document.getElementById("enviar");

enviar.addEventListener("click",

    () => {
        const noticia = {
            titulo:
                document.getElementById("titulo").value,

            subtitulo:
                document.getElementById("subtitulo").value,

            descricao:
                document.getElementById("descricao").value,

            tipo:
                document.getElementById("tipo").value,

            regiao:
                document.getElementById("regiao").value,

            severidade:
                document.getElementById("severidade").value
        };

        console.log(noticia);

        alert("Notícia cadastrada!");
    }
);

const btnEnviar =
    document.getElementById("enviar");

btnEnviar.addEventListener("click",
    () => {

        // Limpa os campos de texto
        document.getElementById("titulo").value = "";

        document.getElementById("subtitulo").value = "";

        document.getElementById("descricao").value = "";

        // Volta os selects para a primeira opção
        document.getElementById("tipo").selectedIndex = 0;

        document.getElementById("regiao").selectedIndex = 0;

        document.getElementById("severidade").selectedIndex = 0;
    }
);

const btnCancelar =
    document.getElementById("cancelar");

btnCancelar.addEventListener("click",
    () => {
        document.getElementById("titulo").value = "";

        document.getElementById("subtitulo").value = "";

        document.getElementById("descricao").value = "";

        document.getElementById("tipo").selectedIndex = 0;

        document.getElementById("regiao").selectedIndex = 0;

        document.getElementById("severidade").selectedIndex = 0;
    }
);