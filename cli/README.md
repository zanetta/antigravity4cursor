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

## Publish

```bash
npm install
npm test --workspace=@zanetta/antigravity4cursor
npm publish --workspace=@zanetta/antigravity4cursor --access public
```
