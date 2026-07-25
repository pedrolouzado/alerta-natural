let ocorrencias = [];

let indiceEdicao = -1;

function salvarOcorrencia() {

  const data =
    document.getElementById("data").value;

  const cidade =
    document.getElementById("cidade").value;

  const tipo =
    document.getElementById("tipo").value;

  const risco =
    document.getElementById("risco").value;

  const descricao =
    document.getElementById("descricao").value;

  // validação

  if (
    data === "" ||
    cidade === "" ||
    tipo === "" ||
    risco === ""
  ) {

    alert("Preencha todos os campos");

    return;
  }

  // objeto do alerta

  const ocorrencia = {

    data: data,
    cidade: cidade,
    tipo: tipo,
    risco: risco,
    descricao: descricao
  };

  // modo edição

  if (indiceEdicao >= 0) {

    ocorrencias[indiceEdicao] = ocorrencia;

    indiceEdicao = -1;

  } else {

    // novo alerta

    ocorrencias.push(ocorrencia);
  }

  // ordenar por data

  ocorrencias.sort((a, b) =>
    new Date(a.data) - new Date(b.data)
  );

  mostrarOcorrencias();

  salvarLocalStorage();

  limparCampos();
}

function mostrarOcorrencias() {

  const lista =
    document.getElementById("lista");

  lista.innerHTML = "";

  // caso não tenha alertas

  if (ocorrencias.length === 0) {

    lista.innerHTML = `
      <p class="vazio">
        Nenhum alerta cadastrado.
      </p>
    `;
    return;
  }

  ocorrencias.forEach((item, indice) => {

    let classeRisco = "";

    // define cor do risco

    if (item.risco === "baixo") {

      classeRisco = "risco-baixo";
    }

    else if (item.risco === "médio") {

      classeRisco = "risco-medio";
    }

    else {

      classeRisco = "risco-alto";
    }

    lista.innerHTML += `

      <div class="card">

        <h3>
          ${item.cidade}
        </h3>

        <p>
          <strong>Data:</strong>
          ${formatarData(item.data)}
        </p>

        <p>
          <strong>Tipo:</strong>
          ${item.tipo}
        </p>

        <p>
          <strong>Risco:</strong>

          <span class="${classeRisco}">
            ${item.risco.toUpperCase()}
          </span>
        </p>

${item.descricao ? `

  <p>
    <strong>Descrição:</strong>
    ${item.descricao}
  </p>

` : ""}

        <button
          onclick="editarOcorrencia(${indice})"
        >
          Editar
        </button>

        <button
          onclick="excluirOcorrencia(${indice})"
        >
          Excluir
        </button>

      </div>
    `;
  });
}

function editarOcorrencia(indice) {

  const item = ocorrencias[indice];

  document.getElementById("data").value =
    item.data;

  document.getElementById("cidade").value =
    item.cidade;

  document.getElementById("tipo").value =
    item.tipo;

  document.getElementById("risco").value =
    item.risco;

  document.getElementById("descricao").value =
    item.descricao;

  indiceEdicao = indice;

  // sobe a tela

  window.scrollTo({

    top: 0,
    behavior: "smooth"
  });
}

function excluirOcorrencia(indice) {

  const confirmar = confirm(
    "Deseja realmente excluir este alerta?"
  );

  if (confirmar) {

    ocorrencias.splice(indice, 1);

    mostrarOcorrencias();

    salvarLocalStorage();
  }
}

function limparCampos() {

  document.getElementById("data").value = "";

  document.getElementById("cidade").value = "";

  document.getElementById("tipo").value = "";

  document.getElementById("risco").value = "";

  document.getElementById("descricao").value = "";
}

function salvarLocalStorage() {

  localStorage.setItem(
    "ocorrencias",
    JSON.stringify(ocorrencias)
  );
}

function carregarDados() {

  const dados =
    localStorage.getItem("ocorrencias");

  if (dados) {

    ocorrencias = JSON.parse(dados);

    mostrarOcorrencias();
  }
}

// formata a data

function formatarData(data) {

  const partes = data.split("-");

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// inicia sistema

carregarDados();