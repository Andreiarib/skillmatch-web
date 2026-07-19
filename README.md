# skillmatch-web

Aplicação web que encontra a vaga que tem maior compatibilidade com o candidato.

Projeto desenvolvido como parte da formação em Front-End (SENAI/SCTEC), aplicando conceitos de JavaScript módulos ES, `fetch`/`async`/`await`, classes e herança, closures, callbacks e persistência com `localStorage`.

## Funcionalidades

- Formulário de cadastro do candidato (nome, área, habilidades e tempo de experiência)
- Cálculo automático do percentual de compatibilidade entre o candidato e cada vaga do catálogo
- Destaque da vaga mais compatível com o perfil informado
- Sugestões de estudo, geradas a partir das habilidades que mais aparecem como pendentes nas vagas
- Persistência do candidato no navegador (`localStorage`), com botão para remover os dados salvos
- Tratamento dos três estados de carregamento de dados: carregando, vazio e erro, com feedback acessível via `aria-live`
- Layout responsivo, do mobile ao desktop

## Estrutura do projeto

```
skillmatch-web/
├── index.html                  # página única, HTML semântico
├── README.md
└── assets/
    ├── styles/
    │   └── index.style.css     # estilos e responsividade (mobile-first)
    ├── scripts/
    │   ├── main.js              # ponto de entrada — orquestra as demais camadas
    │   ├── motor.js              # regras de negócio: cálculo de compatibilidade
    │   ├── ui.js                 # renderização, formulário e eventos de tela
    │   ├── dados.js               # fetch do catálogo + localStorage
    │   └── models.js               # classes Vaga e VagaFrontEnd
    ├── dados/
    │   └── vagas.json            # catálogo de vagas
    └── img/
        └── logo.png
```

### Por que essa divisão

Cada arquivo JavaScript tem uma única responsabilidade, o que facilita manutenção e testes:

| Arquivo     | Responsabilidade                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `dados.js`  | Busca as vagas (`fetch`) e cuida do que é salvo/lido no `localStorage`                                  |
| `models.js` | Define a estrutura dos dados (classes `Vaga` e `VagaFrontEnd`)                                          |
| `motor.js`  | Calcula compatibilidade, encontra a vaga mais compatível e gera sugestões de estudo — sem tocar em tela |
| `ui.js`     | Lê o formulário, escuta eventos e renderiza tudo no DOM — sem calcular nada                             |
| `main.js`   | Amarra as camadas acima, mantendo o estado da aplicação (candidato e vagas)                             |

## Como executar

Como o projeto usa módulos ES (`type="module"`) e `fetch` para carregar o `vagas.json`, ele precisa ser servido por um servidor local — abrir o `index.html` diretamente pelo `file://` não funciona.

**Com a extensão Live Server (VS Code):**
Clique com o botão direito em `index.html` → _Open with Live Server_.

**Com Node:**

```bash
npx serve
```

## Modelo de dados

**Candidato** (preenchido pelo formulário):

```javascript
{
  nome: "Amanda",
  area: "Front-End",
  habilidades: ["HTML", "CSS", "JavaScript", "React", "Scrum"],
  experienciaMeses: 6
}
```

**Vaga** (carregada de `assets/dados/vagas.json`):

```json
{
  "id": 1,
  "empresa": "Microsoft",
  "titulo": "Desenvolvedor Front-End Júnior",
  "requisitos": ["JavaScript", "Vue", "Lógica de Programação", "Scrum"],
  "salario": 3200,
  "modalidade": "Híbrido",
  "nivel": "Júnior"
}
```

Vagas com o campo `nivel` preenchido são instanciadas como `VagaFrontEnd` (que estende `Vaga` e adiciona o método `exibirNivel()`); as demais são instanciadas como `Vaga`.

## Conceitos de JavaScript aplicados

- **Módulos ES** (`import`/`export`) separando dados, regras de negócio e interface
- **Classes e herança** (`Vaga` e `VagaFrontEnd extends Vaga`)
- **`fetch` + `async/await`** para carregar o catálogo de vagas, com tratamento explícito de carregamento, vazio e erro
- **Callback**: `initFormulario` e `initBotaoRemover` recebem funções (`onSubmit`, `onRemover`) que são executadas no momento certo pela camada de UI, sem que ela precise saber o que essas funções fazem
- **`localStorage`**: persistência do candidato entre recarregamentos de página

## Link do trello

https://trello.com/b/tJvEz7X2/skillmatch-web

## Autora

Andréia Domingos Ribeiro
