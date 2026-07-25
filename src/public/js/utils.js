function formatarData(data) {
    if (!data) return "-";

    const partes = data.split("-");

    if (partes.length !== 3) return data;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function obterIcone(tipo) {
    const icones = {
        "temporal": "⛈️",
        "tempestade": "⛈️",
        "alagamento": "🌊",
        "enchente": "🌊",
        "deslizamento": "⛰️",
        "chuva forte": "🌧️",
        "chuva intensa": "🌧️"
    };

    return icones[tipo?.toLowerCase()] || "⚠️";
}

function obterClasseRisco(risco) {
    const riscoNormalizado = risco?.toLowerCase();

    if (riscoNormalizado === "alto") return "alto";
    if (riscoNormalizado === "médio" || riscoNormalizado === "medio") return "medio";
    if (riscoNormalizado === "baixo") return "baixo";

    return "baixo";
}

function obterCorRisco(risco) {
    const classe = obterClasseRisco(risco);

    if (classe === "alto") return "#ef4444";
    if (classe === "medio") return "#f59e0b";

    return "#22c55e";
}

function capitalizarTexto(texto) {
    if (!texto) return "";

    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function limparTexto(texto) {
    return texto ? texto.toString().trim() : "";
}