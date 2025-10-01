# Metodologia

> Projeto: Marupí
> Equipe: Ana Paula Medeiros, Eduarda Gonçalves, Erick Gomes, Guilherme Alarcón, Pedro Hilário, Tales Lopes Ramos

## 1) Objetivo e Escopo

- **Objetivo:** Construir um site responsivo e acessível usando **HTML, CSS e JavaScript puros** (sem backend).
- **Fora do escopo:** Banco de dados, autenticação real, APIs privadas e processamento no servidor.
- **Entregáveis:** Protótipo de baixa fidelidade (Figma), site estático publicado (GitHub Pages), documentação (README, metodologia, guia de contribuição) e testes.

## 2) Processo de Desenvolvimento

Adotaremos um processo **enxuto, iterativo e incremental** baseado em **Kanban** (com WIP limitado) e cerimônias leves, se assemelhando um pouco ao scrum.

### 2.1 Cerimônias

- **Para todas cerimônias utilizaremos:** Teams e whatsapp.
- **Planejamento semanal (30–45 min):** definir metas da semana e quebrar tarefas.
- **Daily assíncrona (via comentário no card):** o que fiz, o que farei, bloqueios.
- **Revisão e Demo (semanal):** mostrar o que foi entregue.
- **Retrospectiva (quinzenal, 30 min):** o que manter, parar, começar.

### 2.2 Quadro de tarefas (Kanban)

Colunas: **Backlog → To Do → Em Progresso → Em Revisão → Aprovado → Feito**.  
Cada card deve ter: descrição clara, critérios de aceitação, estimativa, responsável e links (Figma, PR, issue).

### 2.3 Definition of Ready (DoR)

Uma tarefa só entra em **To Do** se tiver:

- [ ] Descrição e **critérios de aceitação** claros
- [ ] Dependências mapeadas
- [ ] Mock/Protótipo (quando aplicável)

### 2.4 Definition of Done (DoD)

Uma tarefa só vai para **Feito** se:

- [ ] Passou por **code review**
- [ ] **Lint** e **format** sem erros
- [ ] Testes e checagens manuais/aplicáveis ok
- [ ] Acessibilidade mínima atendida (WCAG 2.1 AA – itens-chave)
- [ ] Deploy de preview validado (quando houver)
- [ ] Documentação/CHANGELOG atualizados (se aplicável)

## 3) Ferramentas e Ambiente

- **Editor:** VS Code (plugins recomendados: ESLint, 🛠️) [Windows download](https://code.visualstudio.com/download)
- **Controle de versão:** Git + GitHub [Windows download](https://git-scm.com/downloads)
- **Design:** Figma (wireframe)
- **Gerenciamento de pacotes**: Node V22.20.0 + NPM [Windows download](https://nodejs.org/en/download)
- **Ambiente de desevolvimento**: Node V22.20.0 + NPM [Windows download](https://nodejs.org/en/download)
- **CI/CD:** GitHub Actions (lint, build estático, Lighthouse CI opcional)
- **Hospedagem:** GitHub Pages
- **Comunicação:** Teams, Whatsapp

### 3.1 Como rodar localmente

- Garanta que tenha instalado o Node [Windows download](https://nodejs.org/en/download)
  > O projeto possui **hot reload**, ou seja, ao alterar o código a página no navegador/browser também atualiza

```bash
cd src/
npm run dev
# abrir http://localhost:3000 com o site estático
# obs pode abrir com outra porta
```

### 3.2 Estrutura de pastas

```
/project-root
  ├─ docs/
  └─ metodologia.md
  ├─ src/
  │   ├─ assets/ (Imagens, audios e outros)
  │   ├─ components/ (Recurso nativo do web)
  │   │   └─ cardExample.html (Exemplo)
  │   ├─ pages/ (Páginas do site)
  │   ├─ index.html
  │   ├─ .config
  │   └─ .package.json
  ├─ README.md
```

> Web Components foram escolhidos porque são padrões nativos da Web, suportados pelos navegadores modernos sem necessidade de frameworks externos. Eles utilizam APIs oficiais como Custom Elements, Shadow DOM e HTML Templates, garantindo encapsulamento, reutilização e compatibilidade de longo prazo. [Web components docs](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_components)

## 4) Padrões de Código e UI

### 4.1 HTML

- Semântico, com tags adequadas (`header`, `main`, etc.)
- Um `h1` por página.

### 4.2 CSS

- **Arquitetura:** [BEM](https://getbem.com/) ou utilitários leves.
- **Responsividade:** mobile-first.

### 4.3 JavaScript

- Usar módulos ES.
- Evitar variáveis globais.

### 4.4 Acessibilidade

- Navegação por teclado.
- Contraste ≥ 4.5:1.
- Labels em formulários.

## 5) Qualidade: Lint, Testes e Métricas

- **Performance:** Lighthouse (meta ≥ 90).
- **Testes:** jest + manuais + acessibilidade com Axe DevTools.

### 5.1 Lint

> Utilizar extensões do vscode para isso

- ESLint (regras base para vanilla JS)
- Prettier (formatação consistente)
- Stylelint (CSS)
- HTMLHint (HTML)

## 6) Versionamento e PRs

- **Fluxo:** GitHub Flow (`main` estável, `feature/` para novas features). [docs](https://docs.github.com/en/get-started/using-github/github-flow)
- **Commits:** Conventional Commits [docs](https://www.conventionalcommits.org/en/v1.0.0/).
- **Pull Requests:** pequenos, revisados e com checklist.

## 7) Deploy

- Deploy automático GitHub Pages.
- Merge na `main` publica em produção.

## 8) Riscos e Mitigações

| Risco             | Impacto | Mitigação         |
| ----------------- | ------- | ----------------- |
| Atraso no design  | Médio   | Usar placeholders |
| Performance baixa | Alto    | Lighthouse em PRs |
