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

Digite no chat do Agent, por exemplo:

```
/plan implementar autenticação JWT
/coordinate revisar segurança e performance da API
/remember prefiro bun em vez de npm
/verify build passa após refactor
```

### 4. Validar o projeto

```bash
python3 .cursor/scripts/checklist.py .
python3 .cursor/scripts/verify_all.py . --url http://localhost:3000
```

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
