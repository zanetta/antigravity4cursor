/**
 * Deep-merge MCP config: kit servers are added; existing project servers win on key conflict.
 */
export function mergeMcpJson(existing, incoming) {
    const base = incoming && typeof incoming === "object" ? incoming : {};
    const current = existing && typeof existing === "object" ? existing : {};

    return {
        ...base,
        ...current,
        mcpServers: {
            ...(base.mcpServers ?? {}),
            ...(current.mcpServers ?? {}),
        },
    };
}

/**
 * @param {string} relativePath - POSIX-style path from project root
 */
export function shouldSkipExistingFile(relativePath, force) {
    if (force) return false;
    if (relativePath === ".cursor/mcp.json") return false;
    if (relativePath.startsWith(".cursor/rules/")) return true;
    return false;
}
