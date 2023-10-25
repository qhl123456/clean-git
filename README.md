\# clean-git README





**这是一个帮你一键管理本地git分支的vscode插件,当你在开发时,可能会有需要迭代更新,迭代更新完毕后,有许多不需要的本地分支,不需要执行复杂的git branch -D 命令清除,只需点击一键即可清除**



**tips:如果需要自己开发请安装官方脚手架**



插件开发官方示例库：https://github.com/microsoft/vscode-extension-samples

插件开发官方API文档：https://code.visualstudio.com/api/references/vscode-api

## 1.打开vscode,安装依赖

> 执行npm install 之后按F5即可开发调试模式

## 2.执行打包任务

> ### 2.1首先需要安装 vsce工具
>
> ```
> npm install -g @vscode/vsce
> ```
>
> ### 2.2 执行命令 vsce package

## 3.生成VSIX文件

> 执行第二步后会生成一个VSIX文件,如需发布插件可按照如下方式：
>
> 将插件发布到插件市场必须使用令牌方式发布，需要根据官方指南（
> [https://code.visualstudio.com/api/working-with-extensions/publishing-extension](https://link.zhihu.com/?target=https%3A//code.visualstudio.com/api/working-with-extensions/publishing-extension)）先创建自己的组织，然后创建个人令牌并记住令牌。
>
> 这里我们采用安装到本地即可

## 4.安装到vscode

![image-20231023103058656](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231023103058656.png)

选择我们刚刚生成的VSIX文件即可

## 5.切换到项目主分支或缺省分支

切换到项目主分支或者默认分支,例如master,main等

## 6.执行一键清除

![image-20231023103157764](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231023103157764.png)

![image-20231023103252067](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231023103252067.png)

切换分支后点击一键清理，这时会提示是否处于默认分支，选择是即可完成一键清理以及一键拉取最新代码



**Enjoy!**