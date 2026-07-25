/* ==========================
   CALENDÁRIO DE ALERTAS
   Base: Caio Sprint 2
========================== */

let todosAlertasCalendario = [];
let alertasFiltradosCalendario = [];

let dataAtualCalendario = new Date(2026, 5, 1);
let cidadeSelecionadaCalendario = "brasil";

document.addEventListener("DOMContentLoaded", async () => {
    if (!document.getElementById("grid-calendario")) return;

    await carregarAlertasCalendario();
    configurarEventosCalendario();
});

/* ==========================
   BUSCAR ALERTAS
========================== */

async function carregarAlertasCalendario() {
    try {
        const resposta = await fetch(`${API_BASE_URL}/alertas`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar alertas.");
        }

        todosAlertasCalendario = await resposta.json();

        aplicarFiltrosCalendario();

    } catch (erro) {
        console.error("Erro ao carregar calendário:", erro);

        const grid = document.getElementById("grid-calendario");

        if (grid) {
            grid.innerHTML = `
                <p style="color:red; grid-column:1 / -1; text-align:center;">
                    Erro ao carregar alertas. Tente restaurar os dados de demonstração e recarregue a página.
                </p>
            `;
        }
    }
}

/* ==========================
   FILTROS
========================== */

function aplicarFiltrosCalendario() {
    if (cidadeSelecionadaCalendario === "brasil") {
        alertasFiltradosCalendario = todosAlertasCalendario;
    } else if (cidadeSelecionadaCalendario === "atual") {
        alertasFiltradosCalendario = todosAlertasCalendario.filter(alerta =>
            alerta.cidade?.toLowerCase() === "betim"
        );
    } else {
        alertasFiltradosCalendario = todosAlertasCalendario.filter(alerta =>
            alerta.cidade?.toLowerCase() === cidadeSelecionadaCalendario.toLowerCase()
        );
    }

    renderizarCalendario();
    renderizarUltimosAlertas();
}

/* ==========================
   RENDERIZAR CALENDÁRIO
========================== */

function renderizarCalendario() {
    const grid = document.getElementById("grid-calendario");
    const tituloMesAno = document.getElementById("mes-ano-display");

    if (!grid || !tituloMesAno) return;

    grid.innerHTML = "";

    const ano = dataAtualCalendario.getFullYear();
    const mes = dataAtualCalendario.getMonth();

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    tituloMesAno.innerText = `${nomesMeses[mes]} ${ano}`;

    const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
    const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDiaDaSemana; i++) {
        const espacoVazio = document.createElement("div");
        espacoVazio.style.visibility = "hidden";
        grid.appendChild(espacoVazio);
    }

    for (let dia = 1; dia <= totalDiasNoMes; dia++) {
        const elementoDia = document.createElement("div");

        elementoDia.classList.add("dia-calendario");
        elementoDia.innerText = dia;

        const dataString = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        const alertasDoDia = alertasFiltradosCalendario.filter(alerta => alerta.data === dataString);

        if (alertasDoDia.length > 0) {
            const alertaPrincipal = alertasDoDia[0];
            const riscoClasse = obterClasseRisco(alertaPrincipal.risco || alertaPrincipal.nivel);

            elementoDia.classList.add(`alerta-${riscoClasse}`);

            const divIcone = document.createElement("div");
            divIcone.classList.add("icone-alerta");
            divIcone.innerText = obterIcone(alertaPrincipal.tipo);

            elementoDia.appendChild(divIcone);

            elementoDia.addEventListener("click", () => {
                renderizarDetalhesCalendario(alertaPrincipal, dataString);
            });
        }

        grid.appendChild(elementoDia);
    }
}

/* ==========================
   DETALHES DO ALERTA
========================== */

function renderizarDetalhesCalendario(alerta, dataFormatada) {
    const dataObj = new Date(dataFormatada + "T00:00:00");

    const dataExibicao = dataObj.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const risco = alerta.risco || alerta.nivel || "baixo";
    const cidade = alerta.cidade || "-";
    const bairro = alerta.bairro || "-";
    const periodo = alerta.periodo || "Não informado";
    const descricao = alerta.descricao || "Sem descrição informada.";

    document.getElementById("detalhe-data").innerText = dataExibicao;
    document.getElementById("detalhe-titulo").innerText = alerta.tipo?.toUpperCase() || "ALERTA";

    const badgeRisco = document.getElementById("detalhe-risco");

    badgeRisco.innerText = risco.toUpperCase();
    badgeRisco.style.backgroundColor = obterCorRisco(risco);
    badgeRisco.style.color = "#fff";

    document.getElementById("detalhe-cidade").innerText = cidade.toUpperCase();
    document.getElementById("detalhe-bairro").innerText = bairro;
    document.getElementById("detalhe-periodo").innerText = `Período: ${periodo}`;
    document.getElementById("detalhe-descricao").innerText = descricao;

    const listaRec = document.getElementById("detalhe-recomendas");
    listaRec.innerHTML = "";

    const recomendacoes = alerta.recomendacoes || [
        "Evite áreas de risco.",
        "Acompanhe os canais oficiais da Defesa Civil.",
        "Em caso de emergência, ligue para os órgãos responsáveis."
    ];

    recomendacoes.forEach(recomendacao => {
        const li = document.createElement("li");
        li.innerText = recomendacao;
        listaRec.appendChild(li);
    });
}

/* ==========================
   ÚLTIMOS ALERTAS
========================== */

function renderizarUltimosAlertas() {
    const listaUltimos = document.getElementById("lista-ultimos-alertas");

    if (!listaUltimos) return;

    listaUltimos.innerHTML = "";

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const alertasOrdenados = [...alertasFiltradosCalendario]
        .filter(alerta => alerta.data)
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 5);

    if (alertasOrdenados.length === 0) {
        listaUltimos.innerHTML = `
            <li>
                <p style="color:#94a3b8">
                    Nenhum alerta encontrado para esta região.
                </p>
            </li>
        `;
        return;
    }

    alertasOrdenados.forEach(alerta => {
        const dataObj = new Date(alerta.data + "T00:00:00");

        const dataStr = dataObj.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit"
        });

        const risco = alerta.risco || alerta.nivel || "baixo";

        const li = document.createElement("li");

        li.style.borderLeft = `4px solid ${obterCorRisco(risco)}`;

        li.innerHTML = `
            <span class="icone-pequeno">${obterIcone(alerta.tipo)}</span>

            <div style="flex:1;">
                <p style="margin:0; font-weight:500;">
                    ${capitalizarTexto(alerta.tipo || "Alerta")}
                    em ${alerta.bairro || alerta.cidade || "local não informado"}
                </p>

                <small style="color:#94a3b8;">
                    ${dataStr} • ${alerta.periodo || "Período não informado"}
                </small>
            </div>
        `;

        listaUltimos.appendChild(li);
    });
}

/* ==========================
   EVENTOS
========================== */

function configurarEventosCalendario() {
    const btnAnterior = document.getElementById("btn-mes-anterior");
    const btnProximo = document.getElementById("btn-mes-proximo");
    const btnIrData = document.getElementById("btn-ir-data");
    const seletorCidade = document.getElementById("seletor-cidade");

    if (btnAnterior) {
        btnAnterior.addEventListener("click", () => {
            dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() - 1);
            renderizarCalendario();
        });
    }

    if (btnProximo) {
        btnProximo.addEventListener("click", () => {
            dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() + 1);
            renderizarCalendario();
        });
    }

    if (seletorCidade) {
        seletorCidade.addEventListener("change", (e) => {
            cidadeSelecionadaCalendario = e.target.value;
            aplicarFiltrosCalendario();
            limparDetalhesCalendario();
        });
    }

    if (btnIrData) {
        btnIrData.addEventListener("click", () => {
            const mesSelecionado = parseInt(document.getElementById("seletor-mes-rapido").value);
            const anoSelecionado = parseInt(document.getElementById("input-ano-rapido").value);

            if (!isNaN(anoSelecionado) && anoSelecionado >= 2000 && anoSelecionado <= 2100) {
                dataAtualCalendario.setFullYear(anoSelecionado);
                dataAtualCalendario.setMonth(mesSelecionado);
                renderizarCalendario();
            } else {
                alert("Por favor, insira um ano válido entre 2000 e 2100.");
            }
        });
    }
}

/* ==========================
   LIMPAR DETALHES
========================== */

function limparDetalhesCalendario() {
    document.getElementById("detalhe-titulo").innerText = "Nenhum alerta selecionado";
    document.getElementById("detalhe-data").innerText = "Selecione uma data";

    const badge = document.getElementById("detalhe-risco");
    badge.innerText = "";
    badge.style.backgroundColor = "transparent";

    document.getElementById("detalhe-descricao").innerText =
        "Clique em um dia com ícone de alerta no calendário para ver os detalhes aqui.";

    document.getElementById("detalhe-recomendas").innerHTML = "";
    document.getElementById("detalhe-cidade").innerText = "-";
    document.getElementById("detalhe-bairro").innerText = "-";
    document.getElementById("detalhe-periodo").innerText = "Período: -";
}