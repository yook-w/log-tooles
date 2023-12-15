import * as vscode from 'vscode';

export default async function logSelectedText() {
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
    let endPosition: vscode.Position;
    if (editor.document.lineCount > selection.end.line + 1) {
      // 如果存在下一行，获取下一行的位置
      const nextLine = editor.document.lineAt(selection.end.line + 1);
      endPosition = new vscode.Position(selection.end.line + 1, nextLine.range.start.character);
    } else {
      // 如果不存在下一行，在当前行的下一行插入一行
      endPosition = new vscode.Position(selection.end.line + 1, 0);
      await editor.edit(editBuilder => {
        editBuilder.insert(endPosition, '\n');
      });
    }
    // 获取当前选中文本所在行的前导空白
    const currentLine = editor.document.lineAt(selection.start.line);
    const leadingWhitespace = currentLine.text.slice(0, currentLine.firstNonWhitespaceCharacterIndex);

    // 构造要插入的代码
    const logStatement = `${leadingWhitespace}console.log('${randomEmote} ${selectedText} ==>', ${selectedText});\n`;
    // 插入代码到文本编辑
    editor.edit(editBuilder => {
      editBuilder.insert(endPosition, logStatement);
    }).then(() => {
      // 计算插入代码后的结束位置
      const logEndPosition = new vscode.Position(endPosition.line, endPosition.character + logStatement.length);
      // 移动光标到插入代码后的位置（在 console.log 语句的末尾）
      editor.selection = new vscode.Selection(logEndPosition, logEndPosition);
    });
  } else {
    vscode.window.showInformationMessage('没有选中文本。');
  }
}