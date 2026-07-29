# Chisel Releases LSP — VS Code Extension

VS Code extension that integrates [`chisel-releases-lsp`](https://github.com/dariuszd21/chisel-releases-lsp) to provide IDE support for [Chisel](https://github.com/canonical/chisel) slice definition files.

The extension activates automatically in any workspace that contains a `chisel.yaml` file.

## Features

- **Completions** — slice name completions in `essential:` lists
- **Go to definition** — jump to the slice definition across files
- **Find references** — locate all usages of a slice
- **Rename** — rename a slice with cross-file updates
- **Quick fixes** — fix invalid slice references
- **Symbols** — document and workspace symbol search
- **Diagnostics** — glob pattern validation and duplicate path detection
- **Hover** — slice metadata on hover

## Requirements

The `chisel-releases-lsp` binary must be available on your system.

**Install via Go:**

```bash
go install github.com/dariuszd21/chisel-releases-lsp/cmd/chisel-releases-lsp@latest
```

Ensure `$(go env GOPATH)/bin` is in your `PATH`.

## Extension Settings

| Setting | Default | Description |
|---|---|---|
| `chiselReleasesLsp.serverPath` | `chisel-releases-lsp` | Path to the `chisel-releases-lsp` binary. Override if the binary is not on `PATH`. |

**Example** (`settings.json`):

```json
{
  "chiselReleasesLsp.serverPath": "/usr/local/bin/chisel-releases-lsp"
}
```

## Installation

### From the Marketplace

Search for **Chisel Releases LSP** in the VS Code Extensions view (`Ctrl+Shift+X`).

### From a `.vsix` file

```bash
code --install-extension crl-vscode-<version>.vsix
```

## Building from Source

```bash
node --version   # must be >= 22
npm install
npm run compile
npm run package  # produces crl-vscode-<version>.vsix
```
