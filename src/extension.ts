
import * as vscode from 'vscode';
import logSelectedText from './logSelectedText/index'
import logSearchText from './logSearchText/index'

export function activate(context: vscode.ExtensionContext) {
  // 输出选中log
  let _logSelectedText = vscode.commands.registerCommand('extension.logSelectedText', logSelectedText);
  // 搜索选中log
  let _logSearchText = vscode.commands.registerCommand('extension.logSearchText', logSearchText);

  // 将命令添加到插件的上下文中
  context.subscriptions.push(_logSelectedText);
  context.subscriptions.push(_logSearchText);

}

