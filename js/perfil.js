/* ==========================
   PERFIL DO USUÁRIO
   Base: Isac Sprint 2
========================== */

document.addEventListener("DOMContentLoaded", () => {
    carregarPerfilUsuario();
    configurarLogoutPerfil();
    configurarNotificacoes();
    configurarEdicaoPerfil();
});

/* ==========================
   CARREGAR PERFIL
========================== */

function carregarPerfilUsuario() {
    const usuario = obterUsuarioCorrentePerfil();

    if (!usuario) {
        alert("Você precisa estar logado para acessar o perfil.");
        window.location.href = "login.html";
        return;
    }

    const nomeUsuario = document.getElementById("nomeUsuario");
    const dadosUsuario = document.getElementById("dadosUsuario");

    if (nomeUsuario) {
        nomeUsuario.innerText = usuario.nome || "Nome de usuário";
    }

    if (dadosUsuario) {
        const telefone = usuario.telefone || "(00) 90000-0000";
        const email = usuario.email || "usuario@email.com";

        dadosUsuario.innerText = `${telefone} • ${email}`;
    }
}

/* ==========================
   USUÁRIO LOGADO
========================== */

function obterUsuarioCorrentePerfil() {
    const usuario = sessionStorage.getItem("usuarioCorrente");

    if (!usuario) return null;

    return JSON.parse(usuario);
}

/* ==========================
   LOGOUT
========================== */

function configurarLogoutPerfil() {
    const btnLogout = document.getElementById("btnLogout");

    if (!btnLogout) return;

    btnLogout.addEventListener("click", () => {
        sessionStorage.removeItem("usuarioCorrente");
        alert("Logout realizado com sucesso.");
        window.location.href = "login.html";
    });
}

/* ==========================
   NOTIFICAÇÕES
========================== */

function configurarNotificacoes() {
    const btnNotificacoes = document.getElementById("btnNotificacoes");

    if (!btnNotificacoes) return;

    let notificacoesAtivas = localStorage.getItem("notificacoesAtivas");

    if (notificacoesAtivas === null) {
        notificacoesAtivas = "true";
        localStorage.setItem("notificacoesAtivas", notificacoesAtivas);
    }

    atualizarIconeNotificacao(btnNotificacoes, notificacoesAtivas === "true");

    btnNotificacoes.addEventListener("click", () => {
        const estadoAtual = localStorage.getItem("notificacoesAtivas") === "true";
        const novoEstado = !estadoAtual;

        localStorage.setItem("notificacoesAtivas", novoEstado);

        atualizarIconeNotificacao(btnNotificacoes, novoEstado);

        alert(
            novoEstado
                ? "Notificações ativadas."
                : "Notificações desativadas."
        );
    });
}

function atualizarIconeNotificacao(botao, ativo) {
    botao.innerText = ativo ? "🔔" : "🔕";
    botao.title = ativo ? "Notificações ativadas" : "Notificações desativadas";
}

/* ==========================
   EDITAR PERFIL
========================== */

function configurarEdicaoPerfil() {
    const btnConfiguracoes = document.getElementById("btnConfiguracoes");
    const editarPerfil = document.getElementById("editarPerfil");
    const formEditarPerfil = document.getElementById("formEditarPerfil");
    const btnRecuperarSenha = document.getElementById("btnRecuperarSenha");
    const formAlterarSenha = document.getElementById("formAlterarSenha");

    if (!btnConfiguracoes || !editarPerfil || !formEditarPerfil) return;

    btnConfiguracoes.addEventListener("click", () => {
        const usuario = obterUsuarioCorrentePerfil();

        if (!usuario) return;

        document.getElementById("editarNome").value = usuario.nome || "";
        document.getElementById("editarTelefone").value = usuario.telefone || "";
        document.getElementById("editarEmail").value = usuario.email || "";

        editarPerfil.classList.toggle("ativo");

        editarPerfil.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    formEditarPerfil.addEventListener("submit", (event) => {
        event.preventDefault();

        const usuario = obterUsuarioCorrentePerfil();

        if (!usuario) return;

        usuario.nome = document.getElementById("editarNome").value.trim();
        usuario.telefone = document.getElementById("editarTelefone").value.trim();
        usuario.email = document.getElementById("editarEmail").value.trim();

        sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuario));
        if (typeof atualizarUsuarioLocal === "function") atualizarUsuarioLocal(usuario);

        document.getElementById("nomeUsuario").innerText = usuario.nome || "Nome de usuário";
        document.getElementById("dadosUsuario").innerText =
            `${usuario.telefone || "(00) 90000-0000"} • ${usuario.email || "usuario@email.com"}`;

        alert("Dados do perfil atualizados com sucesso.");
    });

    if (btnRecuperarSenha && formAlterarSenha) {
        btnRecuperarSenha.addEventListener("click", () => {
            formAlterarSenha.classList.toggle("ativo");

            formAlterarSenha.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        formAlterarSenha.addEventListener("submit", (event) => {
            event.preventDefault();

            const usuario = obterUsuarioCorrentePerfil();

            if (!usuario) return;

            const novaSenha = document.getElementById("novaSenha").value.trim();
            const confirmarNovaSenha = document.getElementById("confirmarNovaSenha").value.trim();

            if (!novaSenha || !confirmarNovaSenha) {
                alert("Preencha os dois campos de senha.");
                return;
            }

            if (novaSenha.length < 3) {
                alert("A senha precisa ter pelo menos 3 caracteres.");
                return;
            }

            if (novaSenha !== confirmarNovaSenha) {
                alert("As senhas não conferem.");
                return;
            }

            usuario.senha = novaSenha;

            sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuario));
            if (typeof atualizarUsuarioLocal === "function") atualizarUsuarioLocal(usuario);

            alert("Senha alterada com sucesso.");

            formAlterarSenha.reset();
            formAlterarSenha.classList.remove("ativo");
        });
    }
}