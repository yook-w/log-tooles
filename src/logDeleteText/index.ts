import * as vscode from 'vscode';

export default function logDeleteText() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showInformationMessage('找不到活跃的窗口');
    return;
  }
  const document = editor.document;
  const fullText = document.getText();

  // 改进后的正则表达式，支持多行匹配 console.log
  const logRegex = /console\.log\s*\([^)]*\);?/gs;

  const linesToDelete: number[] = [];
  let match;

  while ((match = logRegex.exec(fullText))) {
    const startPos = document.positionAt(match.index);
    const startLine = startPos.line;
    const endPos = document.positionAt(match.index + match[0].length);
    const endLine = endPos.line;

    // 收集需要删除的行号
    for (let i = startLine; i <= endLine; i++) {
      linesToDelete.push(i);
    }
  }

  // 删除匹配的 console.log 语句行
  if (linesToDelete.length > 0) {
    editor.edit(editBuilder => {
      // 删除时从后向前删除，避免行号改变问题
      linesToDelete.reverse().forEach(line => {
        const lineRange = document.lineAt(line).rangeIncludingLineBreak;
        editBuilder.delete(lineRange);
      });
    });
  } else {
    vscode.window.showInformationMessage('目前没有可删除的 console.log 语句');
  }
}
