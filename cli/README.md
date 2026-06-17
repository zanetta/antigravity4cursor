# @zanetta/antigravity4cursor CLI

Install the antigravity4cursor kit (AG Kit port for Cursor) into any project.

**npm:** [`@zanetta/antigravity4cursor@1.0.0`](https://www.npmjs.com/package/@zanetta/antigravity4cursor)

## Usage

```bash
npx @zanetta/antigravity4cursor init
npx @zanetta/antigravity4cursor init --force
npx @zanetta/antigravity4cursor init --dry-run
npx @zanetta/antigravity4cursor update
npx @zanetta/antigravity4cursor status
```

`init` instala no **diretório atual** (`cwd`). Para outro path: `init --path ~/dev/meu-app`.

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

# Local install from repo root (sem npm registry)
ANTIGRAVITY4CURSOR_REPO=/path/to/antigravity4cursor \
  node bin/index.js init --path /tmp/my-app --dry-run
```

## Publish (GitHub Actions)

Publicação automática ao push de uma tag `v*`:

```bash
git tag v1.0.1
git push origin v1.0.1
```

Workflow: [`.github/workflows/publish-npm.yml`](../.github/workflows/publish-npm.yml)

1. Extrai versão da tag (`v1.2.3` → `1.2.3`)
2. Atualiza `cli/package.json`
3. Roda `npm ci` + `npm test`
4. Publica no npm

### Secret GitHub

| Secret | Valor |
| --- | --- |
| `NPM_TOKEN` | Token granular com **publish** + **bypass 2FA** |

### Publish manual (local)

Registry do projeto (`.npmrc`): `@zanetta:registry=https://registry.npmjs.org/`

```bash
npm install
npm test --workspace=@zanetta/antigravity4cursor
npm publish --workspace=@zanetta/antigravity4cursor --access public --otp=CODIGO   # se 2FA ativa
```

## Troubleshooting

| Erro | Causa | Solução |
| --- | --- | --- |
| `ENEEDAUTH` | Token ausente ou registry errado | Usar `registry.npmjs.org`; `npm login` |
| `E403` (2FA) | Conta sem 2FA ou token sem bypass | 2FA + `--otp` ou token granular com bypass |
| `E403` (permission) | Scope `@zanetta` incorreto | Publicar com conta dona do scope |
| `E404` / `ENOVERSIONS` | `min-release-age` ou `before` no `~/.npmrc` | `NPM_CONFIG_MIN_RELEASE_AGE=0 npx …` |
| Typo | Nome errado | `@zanetta/antigravity4cursor` |

### E404 / ENOVERSIONS no `npx init`

Pacote publicado — confirme:

```bash
npm view @zanetta/antigravity4cursor version
```

Se retornar versão mas `npx` falha, verifique filtros:

```bash
npm config get min-release-age   # ex.: 7 bloqueia pacotes novos
npm config get before
```

Contorno:

```bash
NPM_CONFIG_MIN_RELEASE_AGE=0 npx @zanetta/antigravity4cursor init
# ou
npm config delete min-release-age
```

### E403 — 2FA obrigatória para publish

**Opção A — 2FA + OTP (local):**

1. [npm → Security → 2FA](https://www.npmjs.com/settings/zanetta/tfa) — modo **Authorization and publishing**
2. `npm publish … --otp=SEU_CODIGO`

**Opção B — Token granular (CI / local):**

1. [Generate Granular Access Token](https://www.npmjs.com/settings/zanetta/tokens)
2. Read and Write em `@zanetta/*` + **Bypass 2FA for automation**
3. `npm config set //registry.npmjs.org/:_authToken npm_TOKEN`

### Instalação em projeto existente

```bash
cd ~/dev/meu-projeto
NPM_CONFIG_MIN_RELEASE_AGE=0 npx @zanetta/antigravity4cursor init
```

Merge preserva `.cursor/rules/` e `mcp.json` customizados.

### Sem npm registry

```bash
ANTIGRAVITY4CURSOR_REPO=/caminho/antigravity4cursor \
  node /caminho/antigravity4cursor/cli/bin/index.js init --path .
```
