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

This file should be updated once the extension structure is established — add build/test/lint commands, architecture overview, and project-specific conventions here.
