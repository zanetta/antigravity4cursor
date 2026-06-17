# @zanetta/antigravity4cursor CLI

Install the antigravity4cursor kit (AG Kit port for Cursor) into any project.

## Usage

```bash
npx @zanetta/antigravity4cursor init
npx @zanetta/antigravity4cursor init --force
npx @zanetta/antigravity4cursor init --dry-run
npx @zanetta/antigravity4cursor update
npx @zanetta/antigravity4cursor status
```

## Install scope (full)

- `.claude/agents/`
- `.agents/` (skills + memory)
- `.cursor/` (commands, rules, scripts, mcp, shared)
- `AGENTS.md`, `AGENT_FLOW.md`, `.env.example`

## Merge behavior (default)

| Path | Behavior |
| --- | --- |
| `.cursor/mcp.json` | Merge `mcpServers` (project wins on key conflict) |
| `.cursor/rules/*.mdc` | Skip if file already exists |
| Other files | Skip if exists; `--force` overwrites all |

## Development

```bash
cd cli && npm install && npm test

# Local install from repo root (before npm publish)
ANTIGRAVITY4CURSOR_REPO=/path/to/antigravity4cursor \
  node bin/index.js init --path /tmp/my-app --dry-run
```

## Publish (GitHub Actions)

Publicação automática ao push de uma tag `v*`:

```bash
# 1. Atualize a versão no cli/package.json (opcional — o CI sincroniza pela tag)
# 2. Commit, tag e push
git tag v1.0.0
git push origin v1.0.0
```

O workflow [`.github/workflows/publish-npm.yml`](../.github/workflows/publish-npm.yml):

1. Extrai a versão da tag (`v1.2.3` → `1.2.3`)
2. Atualiza `cli/package.json`
3. Roda `npm ci` + `npm test`
4. Publica `@zanetta/antigravity4cursor` no npm

### Secret obrigatório

No GitHub: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Valor |
| --- | --- |
| `NPM_TOKEN` | Token de acesso do npm ([Automation](https://www.npmjs.com/settings/~tokens) ou Classic com publish) |

O usuário/npm org `@zanetta` precisa existir e o token deve ter permissão de **publish** no pacote.

### Publish manual (local)

```bash
npm install
npm test --workspace=@zanetta/antigravity4cursor
npm publish --workspace=@zanetta/antigravity4cursor --access public
```
