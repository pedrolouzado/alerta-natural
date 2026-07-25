// =========================
// CRIANDO O MAPA
// =========================

const map = L.map('map').setView([-14.2350, -51.9253], 4);


// =========================
// MAPA VISUAL
// =========================

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);


// =========================
// ARRAY DE ALERTAS
// =========================

const alertas = [

  {
    cidade: "Belo Horizonte",
    tipo: "Chuva Forte",
    nivel: "Alto",
    descricao: "Risco de alagamentos",
    lat: -19.9167,
    lng: -43.9345,
    data: "07/02/2026 20:30"
  },

  {
    cidade: "São Paulo",
    tipo: "Tempestade",
    nivel: "Médio",
    descricao: "Rajadas de vento fortes",
    lat: -23.5505,
    lng: -46.6333,
    data: "07/06/2026 18:30"
  },

  {
    cidade: "Recife",
    tipo: "Enchente",
    nivel: "Alto",
    descricao: "Risco de enchentes urbanas",
    lat: -8.0476,
    lng: -34.8770,
    data: "07/06/2026 18:30"
    
  }

];


// =========================
// FUNÇÃO PARA MOSTRAR ALERTAS
// =========================

function mostrarAlerta(alerta) {

  // CRIAR MARCADOR

  const marcador = L.marker([alerta.lat, alerta.lng])
    .addTo(map)
    .bindPopup(`
      <strong>${alerta.cidade}</strong><br>
      ${alerta.tipo}<br>
      ${alerta.descricao}
    `);


  // PEGAR LISTA

  const lista = document.getElementById('listaAlertas');


  // CRIAR CARD

  const card = document.createElement('div');

  card.classList.add('alerta-card');


  // HTML DO CARD

 card.innerHTML = `

  <div class="d-flex justify-content-between align-items-start">

    <div>

      <h5>${alerta.cidade}</h5>

      <p><strong>${alerta.tipo}</strong></p>

      <p>${alerta.descricao}</p>

      <span class="badge bg-danger">
        ${alerta.nivel}
      </span>

    </div>

    <button class="btn btn-danger btn-sm">
      X
    </button>

  </div>

`;


  // BOTÃO EXCLUIR

  const botaoExcluir = card.querySelector('button');

  botaoExcluir.addEventListener('click', () => {

    // REMOVE CARD

    card.remove();

    // REMOVE MARCADOR

    map.removeLayer(marcador);

  });


  // ADICIONAR CARD NA LISTA

  lista.appendChild(card);

}


// =========================
// MOSTRAR ALERTAS INICIAIS
// =========================

alertas.forEach(alerta => {
  mostrarAlerta(alerta);
});


// =========================
// FORMULÁRIO
// =========================

const form = document.getElementById('formAlerta');

form.addEventListener('submit', function(event) {

  // NÃO RECARREGAR

  event.preventDefault();


  // PEGAR DADOS

  const cidade = document.getElementById('cidade').value;

  const tipo = document.getElementById('tipo').value;

  const nivel = document.getElementById('nivel').value;

  const descricao = document.getElementById('descricao').value;


  // POSIÇÃO ALEATÓRIA NO BRASIL

  const lat = -30 + Math.random() * 25;

  const lng = -60 + Math.random() * 25;


  // NOVO ALERTA

  const novoAlerta = {
    cidade,
    tipo,
    nivel,
    descricao,
    lat,
    lng,
    data: new Date().toLocaleString('pt-BR')
};


  // SALVAR NO ARRAY

  alertas.push(novoAlerta);


  // MOSTRAR NO SISTEMA

  mostrarAlerta(novoAlerta);


  // LIMPAR FORMULÁRIO

  form.reset();

});