document.getElementById('cep').addEventListener('blur', async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                document.getElementById('numero').focus();
            }
        } catch (error) {
            console.error(error);
        }
    }
});

document.getElementById('addressForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const endereco = {
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    try {
        await fetch('http://localhost:3000/enderecos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(endereco)
        });
        
        window.location.href = 'index.html';
    } catch (error) {
        console.error(error);
        alert('Erro de conexão com o JSONServer. Ele tá rodando, cachorro?');
    }
});