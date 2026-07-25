/* ==========================
   PAINEL ADMINISTRATIVO
========================== */

let alertasAdmin = [];

verificarAcessoAdmin();

function verificarAcessoAdmin() {
    const usuario = sessionStorage.getItem("usuarioCorrente");

    if (!usuario) {
        alert("Faça login para acessar o painel administrativo.");
        window.location.href = "login.html";
        return;
    }

    const usuarioLogado = JSON.parse(usuario);

    if (usuarioLogado.login !== "admin") {
        alert("Acesso restrito ao administrador.");
        window.location.href = "../index.html";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!document.getElementById("formAlerta")) return;

    configurarFormularioAlerta();
    configurarFormularioNoticia();

    await carregarAlertasAdmin();
});

/* ==========================
   CARREGAR ALERTAS
========================== */

async function carregarAlertasAdmin() {
    try {
        const resposta = await fetch(`${API_BASE_URL}/alertas`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar alertas.");
        }

        alertasAdmin = await resposta.json();

        renderizarAlertasAdmin();

    } catch (erro) {
        console.error("Erro ao carregar alertas:", erro);

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
   FORMULÁRIO DE ALERTA
========================== */

function configurarFormularioAlerta() {
    const form = document.getElementById("formAlerta");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const alerta = obterDadosFormularioAlerta();

        if (!validarAlerta(alerta)) return;

        await salvarAlerta(alerta);

        form.reset();

        await carregarAlertasAdmin();

        alert("Alerta cadastrado com sucesso!");
    });
}

function obterDadosFormularioAlerta() {
    const data = document.getElementById("data")?.value || "";
    const cidade = document.getElementById("cidade")?.value || "";
    const tipo = document.getElementById("tipo")?.value || "";
    const nivel = document.getElementById("nivel")?.value || "";
    const descricao = document.getElementById("descricao")?.value || "";

    const coordenadas = obterCoordenadasPorCidade(cidade);

    return {
        data,
        cidade,
        tipo,
        nivel,
        risco: nivel,
        descricao,
        bairro: "Região central",
        periodo: "Durante o dia",
        lat: coordenadas.lat,
        lng: coordenadas.lng,
        recomendacoes: [
            "Evite áreas de risco.",
            "Acompanhe os comunicados da Defesa Civil.",
            "Em caso de emergência, ligue para os órgãos responsáveis."
        ]
    };
}

function validarAlerta(alerta) {
    if (!alerta.data || !alerta.cidade || !alerta.tipo || !alerta.nivel) {
        alert("Preencha todos os campos obrigatórios do alerta.");
        return false;
    }

    return true;
}

async function salvarAlerta(alerta) {
    try {
        const resposta = await fetch(`${API_BASE_URL}/alertas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alerta)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar alerta.");
        }

    } catch (erro) {
        console.error("Erro ao salvar alerta:", erro);
        alert("Erro ao salvar alerta. Tente restaurar os dados de demonstração e recarregue a página.");
    }
}

/* ==========================
   LISTAR ALERTAS
========================== */

function renderizarAlertasAdmin() {
    const lista = document.getElementById("listaAlertas");

    if (!lista) return;

    lista.innerHTML = "";

    if (alertasAdmin.length === 0) {
        lista.innerHTML = `
            <p class="vazio">
                Nenhum alerta cadastrado.
            </p>
        `;
        return;
    }

    alertasAdmin.forEach(alerta => {
        const risco = alerta.nivel || alerta.risco || "Baixo";
        const classe = obterClasseRisco(risco);

        const card = document.createElement("div");
        card.className = "alerta-card";

        card.innerHTML = `
            <h3>${alerta.cidade || "Cidade não informada"}</h3>

            <p>
                <strong>Data:</strong>
                ${alerta.data ? formatarData(alerta.data) : "Não informada"}
            </p>

            <p>
                <strong>Tipo:</strong>
                ${alerta.tipo || "Não informado"}
            </p>

            <p>
                <strong>Risco:</strong>
                <span class="risco-${classe}">
                    ${risco.toUpperCase()}
                </span>
            </p>

            <p>
                <strong>Descrição:</strong>
                ${alerta.descricao || "Sem descrição."}
            </p>

            <button onclick="excluirAlertaAdmin('${alerta.id}')">
                Excluir
            </button>
        `;

        lista.appendChild(card);
    });
}

/* ==========================
   EXCLUIR ALERTA
========================== */

async function excluirAlertaAdmin(id) {
    const confirmar = confirm("Deseja realmente excluir este alerta?");

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_BASE_URL}/alertas/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir alerta.");
        }

        await carregarAlertasAdmin();

    } catch (erro) {
        console.error("Erro ao excluir alerta:", erro);
        alert("Erro ao excluir alerta.");
    }
}

/* ==========================
   FORMULÁRIO DE NOTÍCIAS
========================== */

function configurarFormularioNoticia() {
    const form = document.getElementById("formNoticia");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const noticia = {
            titulo: document.getElementById("titulo")?.value || "",
            subtitulo: document.getElementById("subtitulo")?.value || "",
            descricao: document.getElementById("descricaoNoticia")?.value || "",
            tipo: document.getElementById("tipoDesastre")?.value || "",
            regiao: document.getElementById("regiao")?.value || "",
            severidade: document.getElementById("severidade")?.value || "",
            data: new Date().toISOString().split("T")[0]
        };

        if (!noticia.titulo || !noticia.descricao) {
            alert("Preencha pelo menos o título e a descrição da notícia.");
            return;
        }

        await salvarNoticia(noticia);

        form.reset();

        alert("Notícia cadastrada com sucesso!");
    });
}

async function salvarNoticia(noticia) {
    try {
        const resposta = await fetch(`${API_BASE_URL}/noticias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noticia)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar notícia.");
        }

    } catch (erro) {
        console.error("Erro ao salvar notícia:", erro);
        alert("Erro ao salvar notícia. Tente restaurar os dados de demonstração e recarregue a página.");
    }
}

/* ==========================
   COORDENADAS SIMPLES
========================== */

function obterCoordenadasPorCidade(cidade) {
    const cidades = {
        "belo horizonte": { lat: -19.9167, lng: -43.9345 },
        "betim": { lat: -19.9678, lng: -44.1983 },
        "são paulo": { lat: -23.5505, lng: -46.6333 },
        "sao paulo": { lat: -23.5505, lng: -46.6333 },
        "rio de janeiro": { lat: -22.9068, lng: -43.1729 },
        "recife": { lat: -8.0476, lng: -34.8770 },
        "porto alegre": { lat: -30.0346, lng: -51.2177 },
        "petrópolis": { lat: -22.5050, lng: -43.1780 },
        "petropolis": { lat: -22.5050, lng: -43.1780 },
        "curitiba": { lat: -25.4284, lng: -49.2733 },
        "salvador": { lat: -12.9777, lng: -38.5016 },
        "fortaleza": { lat: -3.7319, lng: -38.5267 },
        "manaus": { lat: -3.1190, lng: -60.0217 },
        "brasília": { lat: -15.7939, lng: -47.8828 },
        "brasilia": { lat: -15.7939, lng: -47.8828 },
        "vitória": { lat: -20.3155, lng: -40.3128 },
        "vitoria": { lat: -20.3155, lng: -40.3128 }
    };

    const cidadeNormalizada = cidade.toLowerCase().trim();

    return cidades[cidadeNormalizada] || {
        lat: -14.2350,
        lng: -51.9253
    };
}