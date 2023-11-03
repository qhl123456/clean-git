const vscode = require("vscode");
const simpleGit = require("simple-git");

const { checkGitFile } = require("./fs-service/operaFile.js");

const workspace = vscode.workspace;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const cleanGit = vscode.commands.registerCommand(
    "cleanLocalBranch",
    async () => {
      const projectRoot = workspace.workspaceFolders[0].uri.fsPath || "";

      // 使用 simple-git 或其他 Git 库来获取根目录下的分支信息
      // @ts-ignore
      const git = simpleGit(projectRoot);

      git.branch(async (err, branchSummary) => {
        if (err) {
          console.error("Failed to get branch information:", err);
          return;
        }

        const currentBranch = branchSummary.current;
        if (currentBranch !== "master") {
          vscode.window.showErrorMessage("请先切换到默认分支,例如master");
          return;
        } else {
          const isDefaultBranch = await vscode.window.showInformationMessage(
            "当前分支是否已经为默认分支?",
            "是",
            "否"
          );
          if (isDefaultBranch === "否") {
            vscode.window.showErrorMessage("请先切换到默认分支,例如master");
          } else {
            await checkGitFile(projectRoot, vscode);
            // 在 checkGitFile 完成后执行 git pull 命令
            const gitCommand = "git pull origin";
            const terminal =
              vscode.window.activeTerminal || vscode.window.createTerminal();
            terminal.sendText(gitCommand);
          }
        }
      });
    }
  );

  context.subscriptions.push(cleanGit);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
