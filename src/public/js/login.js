/* ==========================
   LOGIN E CADASTRO
   Base: Vitor Sprint 1 + Isac Sprint 1
========================== */

document.addEventListener("DOMContentLoaded", () => {
    configurarLogin();
    configurarCadastroUsuario();
    configurarBotoesLogout();
});

/* ==========================
   LOGIN
========================== */

function configurarLogin() {
    const formLogin = document.getElementById("login-form");

    if (!formLogin) return;

    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();

        const usuarioDigitado = document.getElementById("username").value.trim();
        const senhaDigitada = document.getElementById("password").value.trim();

        if (!usuarioDigitado || !senhaDigitada) {
            alert("Preencha usuário e senha.");
            return;
        }

        const usuario = await buscarUsuarioLogin(usuarioDigitado, senhaDigitada);

        if (!usuario) {
            alert("Usuário ou senha incorretos.");
            return;
        }

        sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuario));

        alert(`Bem-vindo, ${usuario.nome}!`);

        window.location.href = "../index.html";
    });
}

async function buscarUsuarioLogin(login, senha) {
    try {
        const resposta = await fetch(`${API_BASE_URL}/usuarios`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuários.");
        }

        const usuarios = await resposta.json();

        return usuarios.find(usuario =>
            (usuario.login === login || usuario.email === login) &&
            usuario.senha === senha
        );

    } catch (erro) {
        console.error("Erro no login:", erro);
        alert("Erro ao acessar os dados locais. Tente restaurar os dados de demonstração e recarregue a página.");
        return null;
    }
}

/* ==========================
   CADASTRO DE USUÁRIO
========================== */

function configurarCadastroUsuario() {
    const formCadastro = document.getElementById("cadastro-form");

    if (!formCadastro) return;

    formCadastro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const novoUsuario = obterDadosCadastro();

        if (!validarCadastroUsuario(novoUsuario)) return;

        await salvarUsuario(novoUsuario);

        formCadastro.reset();

        alert("Usuário cadastrado com sucesso. Agora faça login.");
    });
}

function obterDadosCadastro() {
    return {
        nome: document.getElementById("nomeCompleto")?.value.trim() || "",
        login: document.getElementById("novoUsuario")?.value.trim() || "",
        email: document.getElementById("email")?.value.trim() || "",
        localizacao: document.getElementById("localizacao")?.value.trim() || "",
        senha: document.getElementById("senha")?.value.trim() || "",
        confirmarSenha: document.getElementById("confirmarSenha")?.value.trim() || ""
    };
}

function validarCadastroUsuario(usuario) {
    if (
        !usuario.nome ||
        !usuario.login ||
        !usuario.email ||
        !usuario.senha ||
        !usuario.confirmarSenha
    ) {
        alert("Preencha todos os campos obrigatórios.");
        return false;
    }

    if (usuario.senha !== usuario.confirmarSenha) {
        alert("As senhas informadas não conferem.");
        return false;
    }

    return true;
}

async function salvarUsuario(usuario) {
    try {
        const usuarioParaSalvar = {
            nome: usuario.nome,
            login: usuario.login,
            email: usuario.email,
            localizacao: usuario.localizacao,
            senha: usuario.senha
        };

        const resposta = await fetch(`${API_BASE_URL}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioParaSalvar)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar usuário.");
        }

    } catch (erro) {
        console.error("Erro ao cadastrar usuário:", erro);
        alert("Erro ao cadastrar usuário. Tente restaurar os dados de demonstração e recarregue a página.");
    }
}

/* ==========================
   USUÁRIO LOGADO
========================== */

function obterUsuarioCorrente() {
    const usuario = sessionStorage.getItem("usuarioCorrente");

    if (!usuario) return null;

    return JSON.parse(usuario);
}

function usuarioEstaLogado() {
    return obterUsuarioCorrente() !== null;
}

/* ==========================
   LOGOUT
========================== */

function configurarBotoesLogout() {
    const botoesLogout = document.querySelectorAll("#btnLogout, #btn_logout");

    botoesLogout.forEach(botao => {
        botao.addEventListener("click", logoutUsuario);
    });
}

function logoutUsuario() {
    sessionStorage.removeItem("usuarioCorrente");
    alert("Logout realizado com sucesso.");
    window.location.href = "login.html";
}

/* ==========================
   COMPATIBILIDADE COM CÓDIGO ANTIGO
========================== */

function loginUser(login, senha) {
    return buscarUsuarioLogin(login, senha);
}

function logoutUser() {
    logoutUsuario();
}

function addUser(nome, login, senha, email) {
    return salvarUsuario({
        nome,
        login,
        senha,
        email,
        localizacao: ""
    });
}