export const PACKAGE_NAME = "@zanetta/antigravity4cursor";
export const BIN_NAME = "antigravity4cursor";
export const DEFAULT_REPO = "github:zanetta/antigravity4cursor";
export const TEMP_FOLDER = ".temp_antigravity4cursor";

/** Paths copied from template root into target project (full install). */
export const INSTALL_PATHS = [
    ".claude",
    ".agents",
    ".cursor",
    "AGENTS.md",
    "AGENT_FLOW.md",
    ".env.example",
];

export const MERGE_JSON_FILES = new Set([".cursor/mcp.json"]);

/** Env override: absolute path to repo root, or giget source (default github:zanetta/antigravity4cursor). */
export const REPO_ENV = "ANTIGRAVITY4CURSOR_REPO";
