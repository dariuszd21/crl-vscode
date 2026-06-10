import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

function getServerConfig(): { minPrefixLength: number } {
  const config = vscode.workspace.getConfiguration("chiselReleasesLsp");
  return {
    minPrefixLength: config.get<number>("minPrefixLength", 2),
  };
}

export function activate(context: vscode.ExtensionContext): void {
  const config = vscode.workspace.getConfiguration("chiselReleasesLsp");
  const serverPath = config.get<string>("serverPath", "chisel-releases-lsp");

  const serverOptions: ServerOptions = {
    run: { command: serverPath, transport: TransportKind.stdio },
    debug: { command: serverPath, transport: TransportKind.stdio },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "yaml" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.yaml"),
      configurationSection: "chiselReleasesLsp",
    },
    initializationOptions: getServerConfig(),
  };

  client = new LanguageClient(
    "chiselReleasesLsp",
    "Chisel Releases LSP",
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
