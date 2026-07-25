// =====================================
// MAPA
// =====================================

const map = L.map('map').setView(
    [-14.2350, -51.9253],
    4
);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap'
    }
).addTo(map);


// =====================================
// ALERTAS EXEMPLO
// =====================================

const alertas = [

{
    cidade: "Belo Horizonte",
    tipo: "Chuva Forte",
    nivel: "Alto",
    descricao:
        "Risco elevado de alagamentos em áreas urbanas.",

    lat: -19.9167,
    lng: -43.9345,

    data: "11/06/2026 • 08:30"
},

{
    cidade: "São Paulo",
    tipo: "Tempestade",
    nivel: "Médio",
    descricao:
        "Rajadas de vento previstas para as próximas horas.",

    lat: -23.5505,
    lng: -46.6333,

    data: "11/06/2026 • 09:10"
},

{
    cidade: "Recife",
    tipo: "Enchente",
    nivel: "Alto",
    descricao:
        "Monitoramento constante de áreas ribeirinhas.",

    lat: -8.0476,
    lng: -34.8770,

    data: "11/06/2026 • 07:45"
},

{
    cidade: "Curitiba",
    tipo: "Deslizamento",
    nivel: "Baixo",
    descricao:
        "Área em observação preventiva.",

    lat: -25.4284,
    lng: -49.2733,

    data: "11/06/2026 • 10:20"
},

{
    cidade: "Rio de Janeiro",
    tipo: "Chuva Forte",
    nivel: "Médio",
    descricao:
        "Possibilidade de alagamentos pontuais.",

    lat: -22.9068,
    lng: -43.1729,

    data: "11/06/2026 • 11:15"
},

{
    cidade: "Salvador",
    tipo: "Tempestade",
    nivel: "Alto",
    descricao:
        "Risco elevado para áreas costeiras.",

    lat: -12.9777,
    lng: -38.5016,

    data: "11/06/2026 • 12:00"
}

];


// =====================================
// MARCADORES
// =====================================

let marcadores = [];


// =====================================
// COR DOS MARCADORES
// =====================================

function obterCorMarcador(nivel){

    if(nivel === "Alto")
        return "red";

    if(nivel === "Médio")
        return "yellow";

    return "green";
}


// =====================================
// ÍCONE LEAFLET
// =====================================

function criarIcone(cor){

    return new L.Icon({

        iconUrl:
        `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${cor}.png`,

        shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

        iconSize: [25, 41],

        iconAnchor: [12, 41]

    });

}


// =====================================
// BADGES
// =====================================

function obterClasseBadge(nivel){

    if(nivel === "Alto")
        return "badge-alto";

    if(nivel === "Médio")
        return "badge-medio";

    return "badge-baixo";
}


// =====================================
// RENDERIZAÇÃO
// =====================================

function renderizarAlertas(lista){

    const painel =
        document.getElementById(
            "listaAlertas"
        );

    painel.innerHTML = "";

    marcadores.forEach(marcador => {

        map.removeLayer(marcador);

    });

    marcadores = [];


    lista.forEach(alerta => {

        const marcador = L.marker(

            [alerta.lat, alerta.lng],

            {
                icon: criarIcone(
                    obterCorMarcador(
                        alerta.nivel
                    )
                )
            }

        )

        .addTo(map)

        .bindPopup(`

            <strong>
                ${alerta.cidade}
            </strong>

            <br>

            ${alerta.tipo}

            <br><br>

            ${alerta.descricao}

            <hr>

            <strong>
                Nível:
            </strong>

            ${alerta.nivel}

        `);

        marcadores.push(marcador);


        let classeCard = "alto";

        if(alerta.nivel === "Médio")
            classeCard = "medio";

        if(alerta.nivel === "Baixo")
            classeCard = "baixo";


        painel.innerHTML += `

        <div class="alerta-card ${classeCard}">

            <div class="alerta-tipo">

                🚨 ${alerta.tipo}

            </div>

            <div class="alerta-cidade">

                📍 ${alerta.cidade}

            </div>

            <div class="alerta-descricao">

                ${alerta.descricao}

            </div>

            <div class="alerta-data">

                🕒 ${alerta.data}

            </div>

            <span class="badge ${obterClasseBadge(alerta.nivel)}">

                ${alerta.nivel} Risco

            </span>

        </div>

        `;

    });

}


// =====================================
// FILTROS
// =====================================

function aplicarFiltros(){

    const cidade =

        document
        .getElementById("buscaCidade")
        .value
        .toLowerCase();

    const risco =

        document
        .getElementById("filtroRisco")
        .value;

    const tipo =

        document
        .getElementById("filtroTipo")
        .value;


    const resultado = alertas.filter(alerta => {

        const cidadeOk =

            alerta.cidade
            .toLowerCase()
            .includes(cidade);

        const riscoOk =

            risco === "Todos"

            ||

            alerta.nivel === risco;

        const tipoOk =

            tipo === "Todos"

            ||

            alerta.tipo === tipo;

        return cidadeOk &&
               riscoOk &&
               tipoOk;

    });

    renderizarAlertas(resultado);

}


// =====================================
// EVENTOS
// =====================================

document
.getElementById("buscaCidade")
.addEventListener(
    "input",
    aplicarFiltros
);

document
.getElementById("filtroRisco")
.addEventListener(
    "change",
    aplicarFiltros
);

document
.getElementById("filtroTipo")
.addEventListener(
    "change",
    aplicarFiltros
);


// =====================================
// INICIALIZAÇÃO
// =====================================

renderizarAlertas(alertas);