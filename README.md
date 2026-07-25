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

## Como executar localmente

Esta seção é destinada a desenvolvedores que desejem baixar o código. Para apenas conhecer o projeto, utilize o link da demonstração online.

1. Clone o repositório:

```bash
git clone https://github.com/pedrolouzado/alerta-natural.git

2. Entre na pasta:

```bash
cd 2026-1-p1-tiawfe-desastresnaturais
```

3. Abra a pasta no Visual Studio Code:

```bash
code .
```

4. Abra o arquivo `index.html` com a extensão Live Server.

Não é necessário executar JSON Server ou instalar pacotes para usar a versão publicada.

## Estrutura principal

```text
├── index.html          # Página inicial publicada
├── css/                # Estilos da versão pública
├── js/                 # Scripts da versão pública
├── pages/              # Páginas internas
├── src/                # Código-fonte académico original
├── docs/               # Documentação do projeto
├── presentation/       # Materiais de apresentação
└── README.md
```

## Integrantes

- Caio José Guimarães Caldas
- Isaac Santos Dutra
- Pedro Marcos Mesquita Louzado
- Victor Fernandes dos Santos
- Vitor Fernandes Diniz

## Professora

- Roselene Henrique Pereira Costa

## Contexto académico

- **Curso:** Sistemas de Informação
- **Disciplina:** Trabalho Interdisciplinar — Aplicações Web Front-End
- **Instituição:** PUC Minas
- **Período:** 1º semestre de 2026

## Documentação

1. [Contexto](docs/01-Contexto.md)
2. [Product discovery](docs/02-Product-discovery.md)
3. [Product design](docs/03-Product-design.md)
4. [Metodologia](docs/04-Metodologia.md)
5. [Projeto de interface](docs/05-Projeto-interface.md)
6. [Template padrão](docs/06-Template-padrao.md)
7. [Arquitetura da solução](docs/07-Arquitetura-solucao.md)
8. [Plano de testes](docs/08-Plano-testes-software.md)
9. [Registro de testes](docs/09-Registro-testes-software.md)
10. [Referências](docs/10-Referencias.md)

## Licença

Consulte o arquivo [LICENSE](LICENSE) do repositório.
