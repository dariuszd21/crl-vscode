import * as os from "os";
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

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const config = vscode.workspace.getConfiguration("chiselReleasesLsp");
  const serverPath = config
    .get<string>("serverPath", "chisel-releases-lsp")
    .replace(/^~/, os.homedir());

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

  try {
    await client.start();
  } catch (err) {
    vscode.window.showErrorMessage(
      `Chisel Releases LSP: failed to start server at "${serverPath}". ` +
        `Install it with: go install github.com/dariuszd21/chisel-releases-lsp/cmd/chisel-releases-lsp@latest\n${err}`
    );
  }
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
