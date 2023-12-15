
import * as vscode from 'vscode';
import logSelectedText from './logSelectedText/index'

export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  let _logSelectedText = vscode.commands.registerCommand('extension.logSelectedText', logSelectedText);
  // 将命令添加到插件的上下文中
  context.subscriptions.push(_logSelectedText);

}

