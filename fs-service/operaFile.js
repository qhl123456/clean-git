const fs = require("fs");
const path = require("path");

/**
 * @param {string} url
 * @param {{window:any}} vscode
 */
function checkGitFile(url, vscode) {
  return new Promise((resolve, reject) => {
    let files = fs.readdirSync(url); //返回文件和子目录的数组
    if (!files.includes(".git")) {
      vscode.window.showErrorMessage("您还未初始化git,请先初始化");
      return reject("您还未初始化git,请先初始化");
    } else {
      const gitFolderPath = path.join(url, ".git");
      readRefsGitFile(gitFolderPath, vscode);
      resolve();
    }
  });
}

/**
 * @param {string} url
 * @param {{window: any}} vscode
 */
function readRefsGitFile(url, vscode) {
  fs.readdir(url, (err, files) => {
    if (err) {
      vscode.window.showErrorMessage(err);
      return;
    }
    if (files.includes("refs")) {
      for (const file of files) {
        if (file === "refs") {
          const filePath = path.join(url, file);
          fs.stat(filePath, (err, stats) => {
            if (err) {
              vscode.window.showErrorMessage(err);
              return;
            }
            if (stats.isDirectory()) {
              // 递归调用 readGitFile 函数，继续读取子目录
              readGitFile(filePath, vscode);
            }
          });
        }
      }
    } else {
      vscode.window.showErrorMessage("git文件夹配置出错,请重新初始化");
      return;
    }
  });
}

/**
 * @param {string} url
 * @param {{window: any}} vscode
 */
function readGitFile(url, vscode) {
  fs.readdir(url, (err, files) => {
    if (err) {
      vscode.window.showErrorMessage(err);
      return;
    }
    for (const file of files) {
      const filePath = path.join(url, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          vscode.window.showErrorMessage(err);
          return;
        }
        if (stats.isDirectory()) {
          // 递归调用 readGitFile 函数，继续读取子目录
          readGitFile(filePath, vscode);
        } else {
          deleteGitFile(filePath, vscode);
        }
      });
    }
  });
}

/**
 * @param {string} filePath
 * @param {{ window: any; commands?: any; }} vscode
 */
function deleteGitFile(filePath, vscode) {
  if (!["master", "HEAD"].some((item) => filePath.endsWith(item))) {
    fs.unlink(filePath, (err) => {
      if (err) {
        vscode.window.showErrorMessage(err);
        return;
      }
    });
  }
}

module.exports = {
  checkGitFile,
};
