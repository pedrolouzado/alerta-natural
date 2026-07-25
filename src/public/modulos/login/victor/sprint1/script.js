const noticias = [

    {
        titulo:
            "Chuvas intensas causam alagamentos em São Paulo",

        descricao:
            "Defesa Civil emite alerta para região metropolitana.",

        tipo:
            "Alagamento",

        regiao:
            "Sudeste", 

        severidade:
            "Alta",

        data:
            "15/05/2026",

        date:
            "2026-05-12"
    },

    {
        titulo:
            "Chuvas acima da média no Acre",

        descricao:
            "Rio Acre atinge nível de atenção em várias localidades.",

        tipo:
            "Alagamento",

        regiao:
            "Norte",

        severidade:
            "Alta",

        data:
            "10/05/2026",

        date:
            "2026-05-10"
    },

    {
        titulo:
            "Deslizamento de terra em área de risco no Rio de Janeiro",

        descricao:
            "Famílias são evacuadas preventivamente pela Defesa Civil.",

        tipo:
            "Deslizamento",

        regiao:
            "Sudeste",

        severidade:
            "Crítica",

        data:
            "06/05/2026",

        date:
            "2026-05-06"
    },

    {
        titulo:
            "Deslizamento após chuvas deixam feridos em Recife",

        descricao:
            "Bombeiros atuam em ocorrências de alagamentos com vítimas ilhadas.",

        tipo:
            "Deslizamento",

        regiao:
            "Nordeste",

        severidade:
            "Crítica",

        data:
            "30/04/2026",

        date:
            "2026-04-30"
    },

    {
        titulo:
            "Chuvas intensas deixam pessoas ilhadas em Minas Gerais",

        descricao:
            "Moradores perdem bens e familiares durante alagamento.",

        tipo:
            "Alagamento",

        regiao:
            "Sudeste",

        severidade:
            "Crítica",

        data:
            "28/04/2026",

        date:
            "2026-04-28"
    }

];

const newsList =
    document.getElementById("news-list");

const resultText =
    document.getElementById("results");

const regionSelect =
    document.getElementById("region");

const sortSelect =
    document.getElementById("sort");

const disasterChecks =
    document.querySelectorAll(
        ".disaster-check"
    );

const severityChecks =
    document.querySelectorAll(
        ".severity-check"
    );

const btnFilter =
    document.getElementById("btn-filter");

// RENDERIZAR NOTÍCIAS

function renderNoticias(lista) {

    newsList.innerHTML = "";

    resultText.textContent =
        `${lista.length} notícias encontradas`;

    lista.forEach(noticia => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        let emoji = "";

        if (noticia.severidade === "Crítica") {

            emoji = "🔴";

        }

        else if (noticia.severidade === "Alta") {

            emoji = "🟠";

        }

        else if (noticia.severidade === "Média") {

            emoji = "🟡";

        }

        else {

            emoji = "🟢";

        }

        card.innerHTML = `
            <div class="card-top">

                ${emoji}
                ${noticia.tipo}
                •
                ${noticia.regiao}
                •
                ${noticia.data}

            </div>

            <h2>
                ${noticia.titulo}
            </h2>

            <p>
                ${noticia.descricao}
            </p>

            <a href="#">
                Ler mais →
            </a>
        `;

        newsList.appendChild(card);

    });

}

// FILTRAR NOTÍCIAS
function filterNoticias() {

    let lista =
        [...noticias];

    // FILTRO DE REGIÃO
    const region =
        regionSelect.value;

    if (region !== "Todas") {

        lista =
            lista.filter(noticia => {

                return noticia.regiao === region;

            });

    }

    // FILTRO DE TIPO
    const tipoSelec = [];

    disasterChecks.forEach(check => {

        if (check.checked) {

            tipoSelec.push(
                check.value
            );

        }

    });

    lista =
        lista.filter(noticia => {

            return tipoSelec.includes(
                noticia.tipo
            );

        });

    // FILTRO DE SEVERIDADE
    const severiSelec = [];

    severityChecks.forEach(check => {

        if (check.checked) {

            severiSelec.push(
                check.value
            );

        }

    });

    lista =
        lista.filter(noticia => {

            return severiSelec.includes(
                noticia.severidade
            );

        });

    // ORDENAÇÃO
    const ordem =
        sortSelect.value;

    if (ordem === "recentes") {

        lista.sort((a, b) => {

            return new Date(b.date)
                - new Date(a.date);

        });

    }

    else {

        lista.sort((a, b) => {

            return new Date(a.date)
                - new Date(b.date);

        });

    }

    // RENDER FINAL
    renderNoticias(lista);

}

// EVENTOS
btnFilter.addEventListener(
    "click",
    filterNoticias
);

regionSelect.addEventListener(
    "change",
    filterNoticias
);

sortSelect.addEventListener(
    "change",
    filterNoticias
);

renderNoticias(noticias);