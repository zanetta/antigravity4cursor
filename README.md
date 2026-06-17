# antigravity4cursor

Port do [AG Kit](https://github.com/vudovn/ag-kit) (Antigravity Kit) para o **Cursor IDE** — agents, skills, workflows e scripts de validação, com paths e regras adaptados ao ecossistema Cursor.

---

## O que é

Este repositório **não** é o pacote npm `@vudovn/ag-kit`. É a configuração completa do kit pronta para usar no Cursor:

| Componente | Onde fica |
| --- | --- |
| 20 agents especialistas | `.claude/agents/` |
| 45 skills | `.agents/skills/` |
| 13 slash commands (+ `/ui-ux-pro-max`) | `.cursor/commands/` |
| Regras globais | `AGENTS.md` |
| Regras por domínio (auto-attach) | `.cursor/rules/*.mdc` |
| Memória persistente | `.agents/memory/` |
| Scripts de validação + sync | `.cursor/scripts/` |
| MCP (Context7, Playwright, shadcn) | `.cursor/mcp.json` |

Documentação detalhada: [`.cursor/ARCHITECTURE.md`](.cursor/ARCHITECTURE.md) · fluxo: [`AGENT_FLOW.md`](AGENT_FLOW.md)

---

## Quick Start

### 1. Usar este repo como template

Clone ou copie para a raiz do seu projeto de aplicação:

```bash
git clone https://github.com/zanetta/antigravity4cursor.git
# ou copie apenas .claude/, .agents/, .cursor/, AGENTS.md
```

### 2. Configurar MCP (opcional)

```bash
cp .env.example .env
# Edite CONTEXT7_API_KEY em .env
```

### 3. Slash commands no Cursor

Digite `/` no chat do **Agent** (modo Agent) para ver autocomplete, ou use os exemplos da seção [Como utilizar os comandos](#como-utilizar-os-comandos).

### 4. Validar o projeto

```bash
python3 .cursor/scripts/checklist.py .
python3 .cursor/scripts/verify_all.py . --url http://localhost:3000
```

---

## Como utilizar os comandos

Os slash commands ficam em `.cursor/commands/` e são invocados no **chat do Agent** do Cursor. A sintaxe é sempre:

```text
/<comando> [descrição em texto livre]
```

O texto após o comando é o contexto da tarefa — não use placeholders; descreva o que precisa em linguagem natural.

### Onde digitar

1. Abra o projeto no Cursor com esta pasta na raiz (ou com `.cursor/commands/` presente).
2. Use o painel **Agent** (não o Ask simples, para tarefas que alteram código).
3. Digite `/` — o Cursor deve sugerir os comandos disponíveis.
4. Complete com `/plan`, `/debug`, etc. e adicione o pedido na mesma mensagem.

### Referência de comandos

| Comando | Quando usar | Exemplo |
| --- | --- | --- |
| `/brainstorm` | Explorar opções e arquitetura **antes** de codar | `/brainstorm qual stack usar para um SaaS multi-tenant?` |
| `/plan` | Quebrar uma tarefa em plano e checklist | `/plan implementar autenticação JWT com refresh token` |
| `/create` | Criar feature nova ou app do zero | `/create landing page Next.js com formulário de waitlist` |
| `/enhance` | Melhorar código ou feature **existente** com segurança | `/enhance adicionar paginação na listagem de usuários` |
| `/debug` | Investigar bug com método sistemático | `/debug login retorna 401 após deploy` |
| `/test` | Gerar ou executar testes | `/test cobrir fluxo de checkout com Playwright` |
| `/verify` | **Executar** e provar que funciona (não só ler código) | `/verify build passa após o refactor do módulo auth` |
| `/deploy` | Pré-flight checks e deploy | `/deploy preparar release para Vercel` |
| `/preview` | Subir ou checar servidor de preview local | `/preview iniciar dev server na porta 3000` |
| `/status` | Relatório do progresso da tarefa atual | `/status` |
| `/orchestrate` | Multi-agente clássico (mín. 3 specialists) | `/orchestrate painel admin com CRUD e testes E2E` |
| `/coordinate` | Orquestração avançada (paralelo + síntese) | `/coordinate revisar segurança e performance da API em paralelo` |
| `/remember` | Salvar preferência ou convenção entre sessões | `/remember prefiro bun em vez de npm neste projeto` |
| `/ui-ux-pro-max` | Design system com estilos/paletas (Cursor-only) | `/ui-ux-pro-max dashboard fintech dark mode minimalista` |

### Fluxo recomendado por tipo de tarefa

**Feature nova (média/grande complexidade)**

```text
/brainstorm [ideia e restrições]
/plan [escopo fechado após brainstorm]
/create ou /enhance [implementação]
/test [cobertura]
/verify [provar que roda]
/deploy [quando estiver pronto]
```

**Bug ou comportamento estranho**

```text
/debug [sintoma, erro, passos para reproduzir]
/verify [confirmar que o fix funciona]
```

**Tarefa full-stack ou multi-domínio**

```text
/coordinate [visão geral]   ← paralelo, fases Research → Synthesis → Implementation
/orchestrate [visão geral]  ← alternativa com mínimo 3 agents
```

**Convenções do projeto (persistir)**

```text
/remember sempre usar Tailwind v4, nunca v3
/remember API base URL em staging é https://api.staging.example.com
```

Memória salva em `.agents/memory/` e reutilizada em sessões futuras via skill `memory-system`.

### Dicas

- **Seja específico** — quanto mais contexto após o comando, melhor o resultado (`/debug` com stack trace, URL, passos).
- **Um comando por mensagem** — evite misturar `/plan` e `/create` na mesma linha; encadeie em mensagens separadas.
- **Modo Agent** — comandos que editam arquivos precisam de permissão para alterar o workspace.
- **Memória** — use `/remember` para decisões que o agente deve repetir (stack, estilo, URLs); não para segredos (use `.env`).
- **Validação manual** — após `/verify` ou `/deploy`, você pode rodar também:

  ```bash
  python3 .cursor/scripts/checklist.py .
  ```

Definições completas de cada workflow: arquivos em [`.cursor/commands/`](.cursor/commands/).

---

## Diferenças vs AG Kit upstream

| Upstream (Gemini/Antigravity) | Este port (Cursor) |
| --- | --- |
| `.agents/agent/` | `.claude/agents/` |
| `.agents/workflows/` | `.cursor/commands/` |
| `GEMINI.md` | `AGENTS.md` + `.cursor/rules/*.mdc` |
| `$ARGUMENTS` nos workflows | Texto livre após o comando |
| Auto-routing nativo | Documentado; aplicado pelo agente quando relevante |
| `npx @vudovn/ag-kit init` | Use este repo ou `sync_upstream.py` |

Limitações completas: seção **Limitações da migração** em [`AGENTS.md`](AGENTS.md).

---

## Sync com upstream (ag-kit)

Mantenha paridade com [vudovn/ag-kit](https://github.com/vudovn/ag-kit):

```bash
# Comparar (dry-run)
python3 .cursor/scripts/sync_upstream.py

# Aplicar sync: agents, skills, memory, commands (adaptados ao Cursor)
python3 .cursor/scripts/sync_upstream.py --apply

# Clonar upstream fresh antes de sync
python3 .cursor/scripts/sync_upstream.py --apply --clone
```

O script:

- Copia **agents** de `.agents/agent/` → `.claude/agents/` (paths Cursor)
- Copia **skills** e **memory**
- Converte **workflows** → `.cursor/commands/` (`$ARGUMENTS` → texto livre)
- **Preserva** `/ui-ux-pro-max` (comando exclusivo Cursor)
- **Não sobrescreve** `AGENTS.md`, `.cursor/rules/`, `README.md`

Recomendação: rode dry-run após cada release upstream; revise diff antes de `--apply` em projetos customizados.

---

## Estrutura resumida

```
.
├── AGENTS.md                 # Regras sempre-ativas
├── AGENT_FLOW.md             # Diagrama de fluxo
├── .claude/agents/           # 20 personas
├── .agents/
│   ├── skills/               # 45 skills
│   └── memory/               # Memória cross-session
└── .cursor/
    ├── ARCHITECTURE.md
    ├── commands/             # /plan, /debug, …
    ├── rules/                # frontend, backend, …
    ├── scripts/              # checklist, sync_upstream
    ├── shared/ui-ux-pro-max/
    └── mcp.json
```

---

## `.gitignore` e indexação do Cursor

**Não** coloque `.agents/` no `.gitignore` do projeto se quiser autocomplete dos slash commands no Cursor.

Para excluir do remoto sem perder indexação local:

```bash
echo ".agents/" >> .git/info/exclude
```

(Conforme [recomendação upstream](https://github.com/vudovn/ag-kit#-important-note-on-gitignore).)

---

## Créditos e licença

- Baseado em [AG Kit / Antigravity Kit](https://github.com/vudovn/ag-kit) por [vudovn](https://github.com/vudovn) — MIT License
- Port Cursor: [zanetta/antigravity4cursor](https://github.com/zanetta/antigravity4cursor)
