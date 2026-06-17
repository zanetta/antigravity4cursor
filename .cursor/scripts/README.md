# Master Scripts — antigravity4cursor

Scripts em `.cursor/scripts/` orquestram validações e sync com o upstream.

## checklist.py

Validação core durante desenvolvimento:

```bash
python3 .cursor/scripts/checklist.py .
python3 .cursor/scripts/checklist.py . --url http://localhost:3000
```

Ordem: Security → Lint → Schema → Tests → UX → SEO (+ Lighthouse se `--url`).

## verify_all.py

Suite completa pre-deploy (checklist + Lighthouse, Playwright, bundle, mobile, i18n):

```bash
python3 .cursor/scripts/verify_all.py .
python3 .cursor/scripts/verify_all.py . --url http://localhost:3000
```

## sync_upstream.py

Compare ou sincronize com [ag-kit](https://github.com/vudovn/ag-kit):

```bash
python3 .cursor/scripts/sync_upstream.py              # dry-run
python3 .cursor/scripts/sync_upstream.py --apply      # aplicar
python3 .cursor/scripts/sync_upstream.py --apply --clone
```

Adaptações automáticas ao aplicar:

- Agents → `.claude/agents/` com paths `.cursor/scripts/`
- Workflows → `.cursor/commands/` sem `$ARGUMENTS`
- Preserva `/ui-ux-pro-max` (não existe no upstream)

## Outros

| Script | Uso |
| --- | --- |
| `session_manager.py` | Gestão de sessão |
| `auto_preview.py` | Preview de servidor local |

Scripts por skill: `.agents/skills/<skill>/scripts/`.
