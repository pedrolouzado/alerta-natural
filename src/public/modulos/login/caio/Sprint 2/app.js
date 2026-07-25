const API_URL = 'http://localhost:3000/alertas';
let todosAlertas = [];
let alertasFiltrados = [];

let dataAtual = new Date(2026, 5, 1);
let cidadeSelecionada = 'atual';

document.addEventListener('DOMContentLoaded', async () => {
  await carregarDadosAPI();
  configurarEventosGerais();
});

async function carregarDadosAPI() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro na rede ou servidor offline.");

    todosAlertas = await response.json();
    aplicarFiltros();
  } catch (error) {
    console.error("Falha ao buscar alertas do JSONServer:", error);
    document.getElementById('grid-calendario').innerHTML =
      `<p style="color:red; grid-column: 1 / -1; text-align: center;">Erro ao carregar dados. Verifique se o JSONServer está rodando.</p>`;
  }
}

function aplicarFiltros() {
    if (cidadeSelecionada === 'brasil') {
        // Se selecionar Brasil, não filtra por cidade, traz todos do banco de dados
        alertasFiltrados = todosAlertas;
    } else if (cidadeSelecionada === 'atual') {
        // Se selecionar Localização Atual, filtra automaticamente por Betim
        alertasFiltrados = todosAlertas.filter(alerta => alerta.cidade === 'betim');
    } else {
        // Filtro normal por cidade selecionada
        alertasFiltrados = todosAlertas.filter(alerta => alerta.cidade === cidadeSelecionada);
    }
    
    renderizarCalendario();
    renderizarUltimosAlertas();
}

function renderizarCalendario() {
  const grid = document.getElementById('grid-calendario');
  const tituloMesAno = document.getElementById('mes-ano-display');
  grid.innerHTML = '';

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  tituloMesAno.innerText = `${nomesMeses[mes]} ${ano}`;

  const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
  const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < primeiroDiaDaSemana; i++) {
    const espacoVazio = document.createElement('div');
    espacoVazio.style.visibility = 'hidden';
    grid.appendChild(espacoVazio);
  }

  for (let dia = 1; dia <= totalDiasNoMes; dia++) {
    const elementoDia = document.createElement('div');
    elementoDia.classList.add('dia-calendario');
    elementoDia.innerText = dia;

    const dataString = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

    const alertaDoDia = alertasFiltrados.find(a => a.data === dataString);

    if (alertaDoDia) {
      elementoDia.classList.add(`alerta-${alertaDoDia.risco}`);

      const divIcone = document.createElement('div');
      divIcone.classList.add('icone-alerta');
      divIcone.innerText = obterIcone(alertaDoDia.tipo);
      elementoDia.appendChild(divIcone);

      elementoDia.addEventListener('click', () => renderizarDetalhes(alertaDoDia, dataString));
    }

    grid.appendChild(elementoDia);
  }
}

function renderizarDetalhes(alerta, dataFormatada) {
  const dataObj = new Date(dataFormatada + "T00:00:00");
  const dataExibicao = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  document.getElementById('detalhe-data').innerText = dataExibicao;
  document.getElementById('detalhe-titulo').innerText = alerta.tipo.toUpperCase();

  const badgeRisco = document.getElementById('detalhe-risco');
  badgeRisco.innerText = alerta.risco.toUpperCase();

  badgeRisco.style.backgroundColor =
    alerta.risco === 'alto' ? '#ef4444' :
      alerta.risco === 'medio' ? '#f59e0b' : '#22c55e';
  badgeRisco.style.color = '#fff';

  document.getElementById('detalhe-cidade').innerText = alerta.cidade.toUpperCase();
  document.getElementById('detalhe-bairro').innerText = alerta.bairro;
  document.getElementById('detalhe-periodo').innerText = `Período: ${alerta.periodo}`;
  document.getElementById('detalhe-descricao').innerText = alerta.descricao;

  const listaRec = document.getElementById('detalhe-recomendas');
  listaRec.innerHTML = '';
  alerta.recomendacoes.forEach(rec => {
    const li = document.createElement('li');
    li.innerText = rec;
    listaRec.appendChild(li);
  });
}

function renderizarUltimosAlertas() {
    const listaUltimos = document.getElementById('lista-ultimos-alertas');
    listaUltimos.innerHTML = '';

    const hoje = new Date(2026, 5, 8); 

    const alertasFuturosOrdenados = alertasFiltrados
        .filter(alerta => {
            const dataAlerta = new Date(alerta.data + "T00:00:00");
            return dataAlerta >= hoje;
        })
        .sort((a, b) => {
            return new Date(a.data + "T00:00:00") - new Date(b.data + "T00:00:00");
        });

    const top5Alertas = alertasFuturosOrdenados.slice(0, 5);

    if (top5Alertas.length === 0) {
        listaUltimos.innerHTML = '<li><p style="color:#94a3b8">Nenhum alerta previsto para os próximos dias nesta região.</p></li>';
        return;
    }
    
    top5Alertas.forEach(alerta => {
        const dataObj = new Date(alerta.data + "T00:00:00");
        const dataStr = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

        const li = document.createElement('li');
        li.style.borderLeft = `4px solid ${
            alerta.risco === 'alto' ? '#ef4444' : 
            alerta.risco === 'medio' ? '#f59e0b' : '#22c55e'
        }`;
        
        li.innerHTML = `
            <span class="icone-pequeno">${obterIcone(alerta.tipo)}</span>
            <div style="flex: 1;">
                <p style="margin: 0; font-weight: 500;">${alerta.tipo.charAt(0).toUpperCase() + alerta.tipo.slice(1)} em ${alerta.bairro}</p>
                <small style="color: #94a3b8;">${dataStr} • ${alerta.periodo}</small>
            </div>
        `;
        listaUltimos.appendChild(li);
    });
}

function obterIcone(tipo) {
  const icones = {
    'temporal': '⛈️',
    'alagamento': '🌊',
    'deslizamento': '⛰️'
  };
  return icones[tipo.toLowerCase()] || '⚠️';
}

function configurarEventosGerais() {
  document.getElementById('btn-mes-anterior').addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    renderizarCalendario();
  });

  document.getElementById('btn-mes-proximo').addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    renderizarCalendario();
  });

  document.getElementById('seletor-cidade').addEventListener('change', (e) => {
    cidadeSelecionada = e.target.value;
    aplicarFiltros();

    document.getElementById('detalhe-titulo').innerText = "Nenhum alerta selecionado";
    document.getElementById('detalhe-data').innerText = "Selecione uma data";
    document.getElementById('detalhe-risco').innerText = "";
    document.getElementById('detalhe-risco').style.backgroundColor = "transparent";
    document.getElementById('detalhe-descricao').innerText = "Clique em um dia com ícone de alerta no calendário para ver os detalhes aqui.";
    document.getElementById('detalhe-recomendas').innerHTML = "";
    document.getElementById('detalhe-cidade').innerText = "-";
    document.getElementById('detalhe-bairro').innerText = "-";
    document.getElementById('detalhe-periodo').innerText = "Período: -";
  });
  document.getElementById('btn-ir-data').addEventListener('click', () => {
        const mesSelecionado = parseInt(document.getElementById('seletor-mes-rapido').value);
        const anoSelecionado = parseInt(document.getElementById('input-ano-rapido').value);
        
        if (!isNaN(anoSelecionado) && anoSelecionado >= 2000 && anoSelecionado <= 2100) {
            dataAtual.setFullYear(anoSelecionado);
            dataAtual.setMonth(mesSelecionado);
            
            // Força o calendário a redesenhar os dias do novo mês/ano escolhido
            renderizarCalendario(); 
        } else {
            alert("Por favor, insira um ano válido entre 2000 e 2100.");
        }
    });
}