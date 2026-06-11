# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Project

`crl-vscode` is a VS Code extension that integrates the [`chisel-releases-lsp`](https://github.com/dariuszd21/chisel-releases-lsp) Language Server Protocol to provide IDE support for Chisel slice definition files (chisel-releases YAML).

The LSP server is written in Go and provides:
- Slice completions in `essential:` lists
- Jump-to-definition and find references across slice dependencies
- Rename refactoring with cross-file updates
- Quick fixes for invalid references
- Glob pattern validation and collision detection
- Hover documentation with slice metadata

## Commands

```bash
npm install          # install dependencies
npm run compile      # bundle with esbuild → out/extension.js
npm run watch        # bundle in watch mode
npm run check-types  # TypeScript type checking (no emit)
npm run lint         # run ESLint
npm run package      # bundle (production) + package into a .vsix
```

## Architecture

The extension is a thin LSP client (`src/extension.ts`). On `activate`, it reads the configured binary path (`chiselReleasesLsp.serverPath`, defaulting to `chisel-releases-lsp` on PATH), launches the process over stdio, and wires it up to VS Code via `vscode-languageclient`. It registers for all `*.yaml` files and watches them for changes so the server can reindex on saves. On `deactivate` the client is stopped.

All language intelligence lives in the external `chisel-releases-lsp` Go binary — the extension itself contains no analysis logic.
