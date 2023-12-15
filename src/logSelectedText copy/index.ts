import * as vscode from 'vscode';

export default function logSelectedText() {
  // 假设 emotes 是一个数组
  const emotes = ["🍊", "🌟", "🎉", "💥", "🚀", "🔥", "💋", "💝", "🏆", "🍭", "🍪", "🍔", "🍉", "🌝", "🐷", "🌀", "🎡", "🛫", "🍖",];
  // 生成随机数
  const randomIndex = Math.floor(Math.random() * emotes.length);
  // 获取随机元素
  const randomEmote = emotes[randomIndex];
  // 获取当前活动的编辑器
  const editor = vscode.window.activeTextEditor;
  // 如果有选中的文本
  if (editor && !editor.selection.isEmpty) {
    // 获取选中文本的范围
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    // 获取选中文本的结束位置
    const endPosition = new vscode.Position(selection.end.line + 1, 0);
    // 构造要插入的代码
    const logStatement = `\nconsole.log('${randomEmote} ${selectedText} ==>', ${selectedText});\n`;
    // 插入代码到文本编辑
    editor.edit(editBuilder => {
      editBuilder.insert(endPosition, logStatement);
    });
    // 移动光标到插入代码后的位置
    editor.selection = new vscode.Selection(endPosition, endPosition);
  } else {
    vscode.window.showInformationMessage('没有选中文本。');
  }
}