import * as vscode from 'vscode';

export default function logDeleteText() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showInformationMessage('找不到活跃的窗口');
    return;
  }

  const document = editor.document;
  const logStatements: vscode.Range[] = [];

  // 修改正则表达式，以匹配完整的 console.log 语句
  const logRegex = /(^|\s+)console\.log\s*\([^)]+\);/g;

  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
    const line = document.lineAt(lineIndex);
    let match;

    while ((match = logRegex.exec(line.text))) {
      const matchRange = new vscode.Range(
        lineIndex, match.index + match[1].length,
        lineIndex, match.index + match[0].length
      );
      logStatements.push(matchRange);
    }
  }

  // 删除匹配的 console.log 语句
  if (logStatements.length > 0) {
    editor.edit(editBuilder => {
      logStatements.forEach(range => {
        const line = document.lineAt(range.start.line);
        // 使用 exec() 方法匹配，确保更灵活
        const regexResult = /^\s*console\.log\s*\([^)]+\);/.exec(line.text);
        // 如果匹配结果不为空，则删除整行
        if (regexResult !== null) {
          editBuilder.delete(line.rangeIncludingLineBreak);
        } else {
          // 否则只删除 console.log 语句
          editBuilder.delete(range);
        }
      });
    });
  } else {
    vscode.window.showInformationMessage('目前没有可删除的 console.log 语句');
  }
}
