/* ==========================
   USUÁRIOS CADASTRADOS
   Base: Vitor Sprint 1
========================== */

document.addEventListener("DOMContentLoaded", async () => {
    await carregarPaginaUsuarios();
    configurarLogoutUsuarios();
});

/* ==========================
   INICIAR PÁGINA
========================== */

async function carregarPaginaUsuarios() {
    const usuario = obterUsuarioCorrenteUsuarios();

    if (!usuario) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    mostrarNomeUsuario(usuario);
    await carregarUsuarios();
}

/* ==========================
   USUÁRIO LOGADO
========================== */

function obterUsuarioCorrenteUsuarios() {
    const usuario = sessionStorage.getItem("usuarioCorrente");

    if (!usuario) return null;

    return JSON.parse(usuario);
}

function mostrarNomeUsuario(usuario) {
    const nomeUsuario = document.getElementById("nomeUsuario");

    if (nomeUsuario) {
        nomeUsuario.innerText = usuario.nome || "Usuário";
    }
}

/* ==========================
   CARREGAR USUÁRIOS
========================== */

async function carregarUsuarios() {
    const tabela = document.getElementById("table-usuarios");

    if (!tabela) return;

    try {
        const resposta = await fetch(`${API_BASE_URL}/usuarios`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuários.");
        }

        const usuarios = await resposta.json();

        renderizarUsuarios(usuarios);

    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="3" class="text-danger">
                    Erro ao carregar usuários. Tente restaurar os dados de demonstração e recarregue a página.
                </td>
            </tr>
        `;
    }
}

/* ==========================
   RENDERIZAR TABELA
========================== */

function renderizarUsuarios(usuarios) {
    const tabela = document.getElementById("table-usuarios");

    tabela.innerHTML = "";

    if (!usuarios || usuarios.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="3">
                    Nenhum usuário cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    usuarios.forEach(usuario => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${usuario.nome || "-"}</td>
            <td>${usuario.login || "-"}</td>
            <td>${usuario.email || "-"}</td>
        `;

        tabela.appendChild(linha);
    });
}

/* ==========================
   LOGOUT
========================== */

function configurarLogoutUsuarios() {
    const btnLogout = document.getElementById("btnLogout");

    if (!btnLogout) return;

    btnLogout.addEventListener("click", () => {
        sessionStorage.removeItem("usuarioCorrente");
        alert("Logout realizado com sucesso.");
        window.location.href = "login.html";
    });
}