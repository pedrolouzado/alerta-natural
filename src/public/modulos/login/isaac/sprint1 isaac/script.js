let usuarios = [];

function criarConta() {
  const nomeCompleto = document.getElementById("nomeCompleto").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const localizacao = document.getElementById("localizacao").value;

  if (
    nomeCompleto === "" ||
    email === "" ||
    senha === "" ||
    confirmarSenha === "" ||
    localizacao === ""
  ) {
    alert("Preencha todos os campos");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem");
    return;
  }

  const usuario = {
    nomeCompleto: nomeCompleto,
    email: email,
    senha: senha,
    localizacao: localizacao
  };

  usuarios.push(usuario);
  salvarLocalStorage();
  limparCampos();
  alert("Conta criada com sucesso!");
}

function limparCampos() {
  document.getElementById("nomeCompleto").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("confirmarSenha").value = "";
  document.getElementById("localizacao").value = "";
}

function salvarLocalStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function carregarDados() {
  const dados = localStorage.getItem("usuarios");
  if (dados) {
    usuarios = JSON.parse(dados);
  }
}

carregarDados();