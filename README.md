# Alerta Natural

Aplicação web académica desenvolvida para apresentar, de forma simples e visual, alertas de desastres naturais e informações sobre áreas de risco no Brasil.

O sistema reúne mapa interativo, filtros, calendário de monitoramento, notícias climáticas, cadastro de usuários, perfil e painel administrativo.

## Demonstração online

[🌐 Acessar o projeto online](https://pedrolouzado.github.io/alerta-natural/)

> Caso o projeto seja publicado em outro repositório, substitua o endereço acima pelo link gerado no GitHub Pages.

## Contas de demonstração

### Administrador

```text
Usuário: admin
Senha: 123
```

### Visitante

```text
Usuário: visitante
Senha: 123
```

As contas são fictícias e servem apenas para demonstrar as funcionalidades do projeto.

## Funcionalidades

- Mapa interativo com alertas e áreas de alcance
- Pesquisa por cidade
- Filtros por tipo de desastre e nível de risco
- Calendário de monitoramento
- Detalhes e recomendações de segurança
- Notícias sobre eventos climáticos
- Cadastro e login de usuários
- Perfil do usuário e alteração de senha
- Cadastro de endereço com consulta ao ViaCEP
- Ativação e desativação de notificações
- Painel administrativo
- Cadastro e exclusão de alertas
- Cadastro de notícias
- Armazenamento dos dados no navegador com `localStorage`

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Leaflet
- OpenStreetMap
- ViaCEP
- LocalStorage
- Git e GitHub
- GitHub Pages

## Como os dados funcionam

Os alertas, notícias e usuários de demonstração são carregados automaticamente na primeira visita.

Cadastros, alterações e exclusões ficam armazenados no `localStorage` do navegador utilizado. Isso permite testar o sistema sem instalar dependências ou iniciar um servidor, mas significa que as alterações não são compartilhadas entre dispositivos diferentes.

O sistema é uma demonstração académica. A autenticação é simulada no navegador e não deve ser usada em aplicações reais com dados sensíveis.

Repositório:

```bash
git clone https://github.com/pedrolouzado/alerta-natural.git
````

## Contexto académico

- **Curso:** Sistemas de Informação
- **Disciplina:** Trabalho Interdisciplinar — Aplicações Web Front-End
- **Instituição:** PUC Minas
- **Período:** 1º semestre de 2026
````

