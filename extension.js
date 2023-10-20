const vscode = require("vscode");
const { checkGitFile } = require("./fs-service/operaFile.js");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const cleanGit = vscode.commands.registerCommand(
    "cleanLocalBranch",
    async () => {
      const isDefaultBranch = await vscode.window.showInformationMessage(
        "当前分支是否为默认分支?",
        "是",
        "否"
      );
      if (isDefaultBranch === "否") {
        vscode.window.showErrorMessage("请先切换到默认分支,例如master");
      } else {
        const projectRoot =
          vscode.workspace.workspaceFolders[0].uri.fsPath || "";
        checkGitFile(projectRoot, vscode);
      }
    }
  );

  context.subscriptions.push(cleanGit);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
