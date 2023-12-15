
import * as vscode from 'vscode';
import logSelectedText from './logSelectedText/index'

export function activate(context: vscode.ExtensionContext) {
  console.log('logSelectedText: ', logSelectedText);
  // 注册命令
  let disposable = vscode.commands.registerCommand('extension.logSelectedText', logSelectedText);
  // 将命令添加到插件的上下文中
  context.subscriptions.push(disposable);

}

