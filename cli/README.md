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

Se o npm pedir OTP após habilitar 2FA:

```bash
npm publish --workspace=@zanetta/antigravity4cursor --access public --otp=123456
```

### Troubleshooting publish

| Erro | Causa | Solução |
| --- | --- | --- |
| `ENEEDAUTH` | Token ausente ou registry errado | Use `registry.npmjs.org` no `.npmrc`; `npm login` |
| `E403` + *Two-factor authentication… required* | 2FA desligada na conta | Habilitar 2FA no npm **ou** token granular com bypass 2FA |
| `E403` + *You do not have permission* | Scope/org incorreto | Publicar com conta dona de `@zanetta` |

#### Erro E403 — 2FA obrigatória para publish

O npm exige **uma** destas opções para publicar pacotes:

**Opção A — 2FA na conta (recomendado para publish local)**

1. [npm → Account → Security](https://www.npmjs.com/settings/zanetta/tfa) → Enable 2FA (**Authorization and publishing**)
2. Publicar com código do app autenticador:

   ```bash
   npm publish --workspace=@zanetta/antigravity4cursor --access public --otp=SEU_CODIGO
   ```

**Opção B — Token granular (recomendado para CI e opcional local)**

1. [npm → Access Tokens → Generate New Token → Granular Access Token](https://www.npmjs.com/settings/zanetta/tokens)
2. Permissions: **Read and Write** em `@zanetta/antigravity4cursor` (ou `@zanetta/*`)
3. Marque **Bypass two-factor authentication for automation**
4. Use o token:

   ```bash
   npm config set //registry.npmjs.org/:_authToken npm_SEU_TOKEN
   npm publish --workspace=@zanetta/antigravity4cursor --access public
   ```

Para **GitHub Actions**, o secret `NPM_TOKEN` deve ser um token granular com **bypass 2FA** (ou Automation token), não o token de sessão do `npm login` sem bypass.
