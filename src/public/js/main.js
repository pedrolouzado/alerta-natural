/* ==========================
   MAPA PRINCIPAL
   Base: Pedro Sprint 2
========================== */

let mapaPrincipal;
let camadaMarcadores = [];
let camadaCirculos = [];
let alertasMapa = [];

document.addEventListener("DOMContentLoaded", async () => {
    if (!document.getElementById("map")) return;

    iniciarMapa();
    configurarEventosMapa();
    await carregarAlertasMapa();
});

/* ==========================
   INICIAR MAPA
========================== */

function iniciarMapa() {
    mapaPrincipal = L.map("map").setView([-14.2350, -51.9253], 4);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 19
        }
    ).addTo(mapaPrincipal);
}

/* ==========================
   BUSCAR ALERTAS
========================== */

async function carregarAlertasMapa() {
    try {
        const resposta = await fetch(`${API_BASE_URL}/alertas`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar alertas.");
        }

        alertasMapa = await resposta.json();

        renderizarMapa(alertasMapa);
        renderizarListaAlertas(alertasMapa);

    } catch (erro) {
        console.error("Erro ao carregar alertas do mapa:", erro);

        const lista = document.getElementById("listaAlertas");

        if (lista) {
            lista.innerHTML = `
                <p class="text-danger">
                    Erro ao carregar alertas. Tente restaurar os dados de demonstração e recarregue a página.
                </p>
            `;
        }
    }
}

/* ==========================
   RENDERIZAR MAPA
========================== */

function renderizarMapa(alertas) {
    limparMapa();

    alertas.forEach(alerta => {
        if (!alerta.lat || !alerta.lng) return;

        const risco = alerta.nivel || alerta.risco || "Baixo";
        const cor = obterCorMarcador(risco);
        const raio = obterRaioRisco(risco);

        const icone = L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${cor}.png`,
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const marcador = L.marker([alerta.lat, alerta.lng], {
            icon: icone
        }).addTo(mapaPrincipal);

        marcador.bindPopup(`
            <strong>${alerta.cidade || "Cidade não informada"}</strong><br>
            <span>${alerta.tipo || "Alerta"}</span><br>
            <span>Nível: ${risco}</span><br>
            <small>${alerta.descricao || ""}</small>
        `);

        const circulo = L.circle([alerta.lat, alerta.lng], {
            color: corHexadecimal(risco),
            fillColor: corHexadecimal(risco),
            fillOpacity: 0.15,
            radius: raio,
            weight: 2
        }).addTo(mapaPrincipal);

        camadaMarcadores.push(marcador);
        camadaCirculos.push(circulo);
    });

}

/* ==========================
   LISTA DE ALERTAS
========================== */

function renderizarListaAlertas(alertas) {
    const lista = document.getElementById("listaAlertas");

    if (!lista) return;

    lista.innerHTML = "";

    if (alertas.length === 0) {
        lista.innerHTML = `
            <p class="text-muted">
                Nenhum alerta encontrado.
            </p>
        `;
        return;
    }

    alertas.forEach(alerta => {
        const risco = alerta.nivel || alerta.risco || "Baixo";
        const classe = obterClasseRisco(risco);

        const card = document.createElement("div");
        card.className = `alerta-card ${classe}`;

        card.innerHTML = `
            <div class="alerta-tipo">
                ${alerta.tipo || "Alerta"}
            </div>

            <div class="alerta-cidade">
                ${alerta.cidade || "Cidade não informada"}
            </div>

            <div class="alerta-descricao">
                ${alerta.descricao || "Sem descrição disponível."}
            </div>

            <div class="alerta-data">
                ${alerta.data ? formatarData(alerta.data) : "Data não informada"}
            </div>

            <span class="badge badge-${classe}">
                ${risco}
            </span>
        `;

        card.addEventListener("click", () => {
            if (alerta.lat && alerta.lng) {
                mapaPrincipal.setView([alerta.lat, alerta.lng], 8);
            }
        });

        lista.appendChild(card);
    });
}

/* ==========================
   FILTROS
========================== */

function configurarEventosMapa() {
    const buscaCidade = document.getElementById("buscaCidade");
    const filtroRisco = document.getElementById("filtroRisco");
    const filtroTipo = document.getElementById("filtroTipo");

    if (buscaCidade) {
        buscaCidade.addEventListener("input", aplicarFiltrosMapa);
    }

    if (filtroRisco) {
        filtroRisco.addEventListener("change", aplicarFiltrosMapa);
    }

    if (filtroTipo) {
        filtroTipo.addEventListener("change", aplicarFiltrosMapa);
    }
}

function aplicarFiltrosMapa() {
    const buscaCidade = document.getElementById("buscaCidade")?.value.toLowerCase() || "";
    const filtroRisco = document.getElementById("filtroRisco")?.value || "Todos";
    const filtroTipo = document.getElementById("filtroTipo")?.value || "Todos";

    const filtrados = alertasMapa.filter(alerta => {
        const cidade = alerta.cidade?.toLowerCase() || "";
        const risco = alerta.nivel || alerta.risco || "";
        const tipo = alerta.tipo || "";

        const passaCidade = cidade.includes(buscaCidade);
        const passaRisco = filtroRisco === "Todos" || risco.toLowerCase() === filtroRisco.toLowerCase();
        const passaTipo = filtroTipo === "Todos" || tipo.toLowerCase() === filtroTipo.toLowerCase();

        return passaCidade && passaRisco && passaTipo;
    });

    renderizarMapa(filtrados);
    renderizarListaAlertas(filtrados);
}

/* ==========================
   LIMPAR MAPA
========================== */

function limparMapa() {
    camadaMarcadores.forEach(marcador => mapaPrincipal.removeLayer(marcador));
    camadaCirculos.forEach(circulo => mapaPrincipal.removeLayer(circulo));

    camadaMarcadores = [];
    camadaCirculos = [];
}

/* ==========================
   CORES E RAIOS
========================== */

function obterCorMarcador(risco) {
    const classe = obterClasseRisco(risco);

    if (classe === "alto") return "red";
    if (classe === "medio") return "gold";

    return "green";
}
function corHexadecimal(risco) {
    const classe = obterClasseRisco(risco);

    if (classe === "alto") return "#dc3545";
    if (classe === "medio") return "#ffc107";

    return "#198754";
}

function obterRaioRisco(risco) {
    const classe = obterClasseRisco(risco);

    if (classe === "alto") return 35000;
    if (classe === "medio") return 25000;

    return 18000;
}