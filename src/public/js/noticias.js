/* ==========================
   NOTÍCIAS CLIMÁTICAS
   Base: Victor Sprint 1
========================== */

let noticias = [];
let noticiasFiltradas = [];
let paginaAtualNoticias = 1;
const noticiasPorPagina = 4;

document.addEventListener("DOMContentLoaded", async () => {
    if (!document.getElementById("news-list")) return;

    await carregarNoticias();
    configurarEventosNoticias();
});

/* ==========================
   BUSCAR NOTÍCIAS
========================== */

async function carregarNoticias() {
    try {
        const resposta = await fetch(`${API_BASE_URL}/noticias`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar notícias.");
        }

        noticias = await resposta.json();

    } catch (erro) {
        console.warn("Não foi possível carregar as notícias salvas. Usando dados de demonstração.", erro);

        noticias = [
            {
                id: 1,
                titulo: "Risco de alagamento em áreas urbanas",
                subtitulo: "Defesa Civil emite alerta preventivo",
                descricao: "Chuvas intensas podem causar pontos de alagamento em regiões de baixa altitude.",
                tipo: "Alagamento",
                regiao: "Sudeste",
                severidade: "Alta",
                data: "2026-06-10"
            },
            {
                id: 2,
                titulo: "Possibilidade de deslizamentos",
                subtitulo: "Áreas de encosta exigem atenção",
                descricao: "Moradores em áreas de risco devem acompanhar os comunicados oficiais.",
                tipo: "Deslizamento",
                regiao: "Sul",
                severidade: "Crítica",
                data: "2026-06-08"
            },
            {
                id: 3,
                titulo: "Temporal previsto para o fim da tarde",
                subtitulo: "Rajadas de vento podem ocorrer",
                descricao: "A previsão indica chuva forte acompanhada de ventos intensos.",
                tipo: "Alagamento",
                regiao: "Centro-Oeste",
                severidade: "Média",
                data: "2026-06-05"
            }
        ];
    }

    noticiasFiltradas = [...noticias];

    renderizarNoticias();
}

/* ==========================
   EVENTOS
========================== */

function configurarEventosNoticias() {
    const btnFiltro = document.getElementById("btn-filter");
    const ordenar = document.getElementById("sort");
    const btnAnterior = document.getElementById("prev");
    const btnProximo = document.getElementById("next");

    if (btnFiltro) {
        btnFiltro.addEventListener("click", () => {
            paginaAtualNoticias = 1;
            aplicarFiltrosNoticias();
        });
    }

    if (ordenar) {
        ordenar.addEventListener("change", () => {
            ordenarNoticias();
            renderizarNoticias();
        });
    }

    if (btnAnterior) {
        btnAnterior.addEventListener("click", () => {
            if (paginaAtualNoticias > 1) {
                paginaAtualNoticias--;
                renderizarNoticias();
            }
        });
    }

    if (btnProximo) {
        btnProximo.addEventListener("click", () => {
            const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina);

            if (paginaAtualNoticias < totalPaginas) {
                paginaAtualNoticias++;
                renderizarNoticias();
            }
        });
    }
}

/* ==========================
   FILTRAR NOTÍCIAS
========================== */

function aplicarFiltrosNoticias() {
    const tiposSelecionados = Array.from(document.querySelectorAll(".disaster-check:checked"))
        .map(input => input.value);

    const severidadesSelecionadas = Array.from(document.querySelectorAll(".severity-check:checked"))
        .map(input => input.value);

    const regiaoSelecionada = document.getElementById("region")?.value || "Todas";

    noticiasFiltradas = noticias.filter(noticia => {
        const passaTipo = tiposSelecionados.length === 0 || tiposSelecionados.includes(noticia.tipo);
        const passaSeveridade = severidadesSelecionadas.length === 0 || severidadesSelecionadas.includes(noticia.severidade);
        const passaRegiao = regiaoSelecionada === "Todas" || noticia.regiao === regiaoSelecionada;

        return passaTipo && passaSeveridade && passaRegiao;
    });

    ordenarNoticias();
    renderizarNoticias();
}

/* ==========================
   ORDENAR
========================== */

function ordenarNoticias() {
    const tipoOrdenacao = document.getElementById("sort")?.value || "recentes";

    noticiasFiltradas.sort((a, b) => {
        const dataA = new Date(a.data || "2000-01-01");
        const dataB = new Date(b.data || "2000-01-01");

        if (tipoOrdenacao === "antigas") {
            return dataA - dataB;
        }

        return dataB - dataA;
    });
}

/* ==========================
   RENDERIZAR
========================== */

function renderizarNoticias() {
    const lista = document.getElementById("news-list");
    const resultado = document.getElementById("results");

    if (!lista) return;

    lista.innerHTML = "";

    if (resultado) {
        resultado.innerText = `${noticiasFiltradas.length} notícias encontradas`;
    }

    if (noticiasFiltradas.length === 0) {
        lista.innerHTML = `
            <div class="news-card">
                <p>Nenhuma notícia encontrada com os filtros selecionados.</p>
            </div>
        `;
        atualizarPaginacaoNoticias();
        return;
    }

    const inicio = (paginaAtualNoticias - 1) * noticiasPorPagina;
    const fim = inicio + noticiasPorPagina;
    const noticiasPagina = noticiasFiltradas.slice(inicio, fim);

    noticiasPagina.forEach(noticia => {
        const card = document.createElement("div");
        card.className = "news-card";

        card.innerHTML = `
            <div class="card-top">
                ${noticia.regiao || "Região não informada"} •
                ${noticia.severidade || "Sem severidade"} •
                ${noticia.data ? formatarData(noticia.data) : "Data não informada"}
            </div>

            <h2>${noticia.titulo || "Notícia climática"}</h2>

            <p><strong>${noticia.subtitulo || ""}</strong></p>

            <p>${noticia.descricao || "Sem descrição disponível."}</p>

            <a href="#">Ler mais</a>
        `;

        lista.appendChild(card);
    });

    atualizarPaginacaoNoticias();
}

/* ==========================
   PAGINAÇÃO
========================== */

function atualizarPaginacaoNoticias() {
    const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina) || 1;

    const botoesPagina = document.querySelectorAll(".pagination .page");

    botoesPagina.forEach((botao, index) => {
        const numeroPagina = index + 1;

        botao.innerText = numeroPagina;
        botao.classList.toggle("active", numeroPagina === paginaAtualNoticias);

        botao.onclick = () => {
            if (numeroPagina <= totalPaginas) {
                paginaAtualNoticias = numeroPagina;
                renderizarNoticias();
            }
        };

        botao.disabled = numeroPagina > totalPaginas;
    });

    const btnAnterior = document.getElementById("prev");
    const btnProximo = document.getElementById("next");

    if (btnAnterior) {
        btnAnterior.disabled = paginaAtualNoticias === 1;
    }

    if (btnProximo) {
        btnProximo.disabled = paginaAtualNoticias >= totalPaginas;
    }
}