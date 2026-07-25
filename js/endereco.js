/* ==========================
   CADASTRO DE ENDEREÇO
   Base: Isac Sprint 2
========================== */

document.addEventListener("DOMContentLoaded", () => {
    carregarEnderecoSalvo();
    configurarFormularioEndereco();
    configurarBuscaCep();
});

/* ==========================
   FORMULÁRIO
========================== */

function configurarFormularioEndereco() {
    const form = document.getElementById("formEndereco");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const endereco = obterDadosEndereco();

        if (!validarEndereco(endereco)) return;

        salvarEndereco(endereco);

        alert("Endereço salvo com sucesso!");

        window.location.href = "perfil.html";
    });
}

/* ==========================
   OBTER DADOS
========================== */

function obterDadosEndereco() {
    return {
        cep: document.getElementById("cep")?.value.trim() || "",
        logradouro: document.getElementById("logradouro")?.value.trim() || "",
        numero: document.getElementById("numero")?.value.trim() || "",
        complemento: document.getElementById("complemento")?.value.trim() || "",
        bairro: document.getElementById("bairro")?.value.trim() || "",
        cidade: document.getElementById("cidade")?.value.trim() || "",
        estado: document.getElementById("estado")?.value.trim() || ""
    };
}

/* ==========================
   VALIDAR
========================== */

function validarEndereco(endereco) {
    if (
        !endereco.cep ||
        !endereco.logradouro ||
        !endereco.numero ||
        !endereco.bairro ||
        !endereco.cidade ||
        !endereco.estado
    ) {
        alert("Preencha todos os campos obrigatórios.");
        return false;
    }

    return true;
}

/* ==========================
   SALVAR
========================== */

function salvarEndereco(endereco) {
    sessionStorage.setItem("enderecoUsuario", JSON.stringify(endereco));

    const usuario = sessionStorage.getItem("usuarioCorrente");

    if (usuario) {
        const usuarioAtualizado = JSON.parse(usuario);

        usuarioAtualizado.endereco = endereco;
        usuarioAtualizado.localizacao = `${endereco.cidade} - ${endereco.estado}`;

        sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioAtualizado));
        if (typeof atualizarUsuarioLocal === "function") atualizarUsuarioLocal(usuarioAtualizado);
    }
}

/* ==========================
   CARREGAR ENDEREÇO SALVO
========================== */

function carregarEnderecoSalvo() {
    const enderecoSalvo = sessionStorage.getItem("enderecoUsuario");

    if (!enderecoSalvo) return;

    const endereco = JSON.parse(enderecoSalvo);

    document.getElementById("cep").value = endereco.cep || "";
    document.getElementById("logradouro").value = endereco.logradouro || "";
    document.getElementById("numero").value = endereco.numero || "";
    document.getElementById("complemento").value = endereco.complemento || "";
    document.getElementById("bairro").value = endereco.bairro || "";
    document.getElementById("cidade").value = endereco.cidade || "";
    document.getElementById("estado").value = endereco.estado || "";
}

/* ==========================
   BUSCA CEP - VIACEP
========================== */

function configurarBuscaCep() {
    const campoCep = document.getElementById("cep");

    if (!campoCep) return;

    campoCep.addEventListener("blur", async () => {
        const cep = campoCep.value.replace(/\D/g, "");

        if (cep.length !== 8) return;

        await buscarCep(cep);
    });
}

async function buscarCep(cep) {
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar CEP.");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }

        document.getElementById("logradouro").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";

    } catch (erro) {
        console.error("Erro ao buscar CEP:", erro);
        alert("Não foi possível buscar o CEP.");
    }
}