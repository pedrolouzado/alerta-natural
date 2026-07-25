/* =====================================================
   CAMADA DE DADOS LOCAL
   Substitui o JSON Server por localStorage para permitir
   a publicação estática no GitHub Pages.
===================================================== */

const API_BASE_URL = "local-api";
const STORAGE_VERSION = "alerta-natural-v1";
const STORAGE_VERSION_KEY = "alertaNaturalStorageVersion";

const DADOS_INICIAIS = {
    alertas: [
        {
            id: "1",
            data: "2026-06-10",
            cidade: "Belo Horizonte",
            tipo: "Chuva Forte",
            nivel: "Alto",
            risco: "Alto",
            descricao: "Risco elevado de alagamentos em áreas urbanas.",
            bairro: "Centro",
            periodo: "Manhã",
            lat: -19.9167,
            lng: -43.9345,
            recomendacoes: [
                "Evite áreas alagadas.",
                "Não tente atravessar enxurradas.",
                "Acompanhe os avisos da Defesa Civil."
            ]
        },
        {
            id: "2",
            data: "2026-06-29",
            cidade: "São Paulo",
            tipo: "Tempestade",
            nivel: "Médio",
            risco: "Médio",
            descricao: "Rajadas de vento previstas para as próximas horas.",
            bairro: "Zona Sul",
            periodo: "Tarde",
            lat: -23.5505,
            lng: -46.6333,
            recomendacoes: [
                "Evite ficar próximo de árvores.",
                "Retire objetos soltos de varandas.",
                "Procure abrigo em local seguro."
            ]
        },
        {
            id: "3",
            data: "2026-06-01",
            cidade: "Recife",
            tipo: "Enchente",
            nivel: "Alto",
            risco: "Alto",
            descricao: "Risco de enchentes urbanas em regiões de baixa altitude.",
            bairro: "Boa Vista",
            periodo: "Noite",
            lat: -8.0476,
            lng: -34.877,
            recomendacoes: [
                "Evite transitar por áreas alagadas.",
                "Desligue aparelhos elétricos em caso de inundação.",
                "Procure locais elevados."
            ]
        },
        {
            id: "4",
            data: "2026-06-24",
            cidade: "Porto Alegre",
            tipo: "Enchente",
            nivel: "Alto",
            risco: "Alto",
            descricao: "Rio Guaíba apresenta elevação acima do nível de alerta.",
            bairro: "Centro Histórico",
            periodo: "Manhã",
            lat: -30.0346,
            lng: -51.2177,
            recomendacoes: [
                "Evite áreas próximas ao rio.",
                "Procure rotas alternativas.",
                "Siga orientações da Defesa Civil."
            ]
        },
        {
            id: "5",
            data: "2026-06-15",
            cidade: "Petrópolis",
            tipo: "Deslizamento",
            nivel: "Alto",
            risco: "Alto",
            descricao: "Solo encharcado aumenta o risco de deslizamentos em encostas.",
            bairro: "Quitandinha",
            periodo: "Tarde",
            lat: -22.505,
            lng: -43.178,
            recomendacoes: [
                "Evite áreas de encosta.",
                "Observe rachaduras em terrenos.",
                "Evacue em caso de movimentação do solo."
            ]
        },
        {
            id: "6",
            data: "2026-06-16",
            cidade: "Salvador",
            tipo: "Chuva Forte",
            nivel: "Médio",
            risco: "Médio",
            descricao: "Previsão de chuva intensa com possibilidade de alagamentos pontuais.",
            bairro: "Pituba",
            periodo: "Noite",
            lat: -12.9718,
            lng: -38.5011,
            recomendacoes: [
                "Evite ruas alagadas.",
                "Reduza a velocidade ao dirigir.",
                "Acompanhe os boletins meteorológicos."
            ]
        },
        {
            id: "7",
            data: "2026-06-07",
            cidade: "Curitiba",
            tipo: "Tempestade",
            nivel: "Baixo",
            risco: "Baixo",
            descricao: "Previsão de rajadas moderadas de vento e chuva isolada.",
            bairro: "Batel",
            periodo: "Tarde",
            lat: -25.4284,
            lng: -49.2733,
            recomendacoes: [
                "Evite estacionar sob árvores.",
                "Feche portas e janelas.",
                "Fique atento às condições climáticas."
            ]
        },
        {
            id: "8",
            data: "2026-06-18",
            cidade: "Manaus",
            tipo: "Chuva Forte",
            nivel: "Médio",
            risco: "Médio",
            descricao: "Chuva intensa prevista para a região metropolitana durante a tarde.",
            bairro: "Centro",
            periodo: "Tarde",
            lat: -3.119,
            lng: -60.0217,
            recomendacoes: [
                "Evite deslocamentos desnecessários.",
                "Não atravesse áreas alagadas.",
                "Acompanhe os comunicados oficiais."
            ]
        }
    ],
    noticias: [
        {
            id: "1",
            titulo: "Defesa Civil alerta para chuvas intensas",
            subtitulo: "Previsão indica possibilidade de alagamentos",
            descricao: "A Defesa Civil emitiu comunicado preventivo para regiões com histórico de enchentes.",
            tipo: "Alagamento",
            regiao: "Sudeste",
            severidade: "Alta",
            data: "2026-06-10"
        },
        {
            id: "2",
            titulo: "Áreas de encosta exigem atenção",
            subtitulo: "Risco de deslizamento aumenta com chuva acumulada",
            descricao: "Moradores de áreas de risco devem acompanhar os comunicados oficiais.",
            tipo: "Deslizamento",
            regiao: "Sul",
            severidade: "Crítica",
            data: "2026-06-09"
        }
    ],
    usuarios: [
        {
            id: "1",
            nome: "Administrador",
            login: "admin",
            email: "admin@demo.local",
            senha: "123",
            localizacao: "Betim - MG"
        },
        {
            id: "2",
            nome: "Usuário de demonstração",
            login: "visitante",
            email: "visitante@demo.local",
            senha: "123",
            localizacao: "Belo Horizonte - MG"
        }
    ]
};

function clonarDados(valor) {
    return JSON.parse(JSON.stringify(valor));
}

function inicializarDadosLocais() {
    const versaoAtual = localStorage.getItem(STORAGE_VERSION_KEY);

    if (versaoAtual !== STORAGE_VERSION) {
        Object.entries(DADOS_INICIAIS).forEach(([colecao, dados]) => {
            localStorage.setItem(`alertaNatural:${colecao}`, JSON.stringify(dados));
        });
        localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
        return;
    }

    Object.entries(DADOS_INICIAIS).forEach(([colecao, dados]) => {
        const chave = `alertaNatural:${colecao}`;
        if (localStorage.getItem(chave) === null) {
            localStorage.setItem(chave, JSON.stringify(dados));
        }
    });
}

function lerColecao(colecao) {
    inicializarDadosLocais();
    const valor = localStorage.getItem(`alertaNatural:${colecao}`);
    return valor ? JSON.parse(valor) : [];
}

function salvarColecao(colecao, dados) {
    localStorage.setItem(`alertaNatural:${colecao}`, JSON.stringify(dados));
}

function gerarId(itens) {
    const idsNumericos = itens
        .map(item => Number(item.id))
        .filter(Number.isFinite);

    return String((idsNumericos.length ? Math.max(...idsNumericos) : 0) + 1);
}

function criarResposta(dados, status = 200) {
    return new Response(JSON.stringify(dados), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}

async function tratarRequisicaoLocal(url, opcoes = {}) {
    const caminho = url.replace(`${API_BASE_URL}/`, "").split("?")[0];
    const [colecao, id] = caminho.split("/");
    const metodo = (opcoes.method || "GET").toUpperCase();

    if (!Object.prototype.hasOwnProperty.call(DADOS_INICIAIS, colecao)) {
        return criarResposta({ erro: "Recurso não encontrado." }, 404);
    }

    const itens = lerColecao(colecao);

    if (metodo === "GET") {
        if (!id) return criarResposta(clonarDados(itens));

        const item = itens.find(registro => String(registro.id) === String(id));
        return item
            ? criarResposta(clonarDados(item))
            : criarResposta({ erro: "Registro não encontrado." }, 404);
    }

    if (metodo === "POST") {
        const novoItem = JSON.parse(opcoes.body || "{}");
        novoItem.id = novoItem.id || gerarId(itens);
        itens.push(novoItem);
        salvarColecao(colecao, itens);
        return criarResposta(clonarDados(novoItem), 201);
    }

    const indice = itens.findIndex(registro => String(registro.id) === String(id));

    if (indice < 0) {
        return criarResposta({ erro: "Registro não encontrado." }, 404);
    }

    if (metodo === "PUT" || metodo === "PATCH") {
        const alteracoes = JSON.parse(opcoes.body || "{}");
        itens[indice] = metodo === "PUT"
            ? { ...alteracoes, id: itens[indice].id }
            : { ...itens[indice], ...alteracoes, id: itens[indice].id };
        salvarColecao(colecao, itens);
        return criarResposta(clonarDados(itens[indice]));
    }

    if (metodo === "DELETE") {
        const [removido] = itens.splice(indice, 1);
        salvarColecao(colecao, itens);
        return criarResposta(clonarDados(removido));
    }

    return criarResposta({ erro: "Método não permitido." }, 405);
}

const fetchOriginal = window.fetch.bind(window);
window.fetch = function fetchComArmazenamentoLocal(recurso, opcoes = {}) {
    const url = typeof recurso === "string" ? recurso : recurso.url;

    if (url.startsWith(API_BASE_URL)) {
        return Promise.resolve(tratarRequisicaoLocal(url, opcoes));
    }

    return fetchOriginal(recurso, opcoes);
};

function atualizarUsuarioLocal(usuarioAtualizado) {
    if (!usuarioAtualizado?.id) return;

    const usuarios = lerColecao("usuarios");
    const indice = usuarios.findIndex(usuario => String(usuario.id) === String(usuarioAtualizado.id));

    if (indice >= 0) {
        usuarios[indice] = { ...usuarios[indice], ...usuarioAtualizado };
        salvarColecao("usuarios", usuarios);
    }
}

function restaurarDadosDemonstracao() {
    Object.entries(DADOS_INICIAIS).forEach(([colecao, dados]) => {
        localStorage.setItem(`alertaNatural:${colecao}`, JSON.stringify(dados));
    });
    sessionStorage.clear();
    localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
    window.location.reload();
}

inicializarDadosLocais();
