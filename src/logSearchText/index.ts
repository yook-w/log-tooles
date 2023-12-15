import * as vscode from 'vscode';

interface SearchEngines {
  Google: string,
  Bing: string,
  Baidu: string
}

export default function logSearchText() {
  // 获取当前活动的编辑器
  const editor = vscode.window.activeTextEditor;
  // 如果有选中的文本
  if (editor && !editor.selection.isEmpty) {
    // 获取选中文本的范围
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    // 获取搜索引擎配置
    const defaultSearchEngine = 'Baidu';  // 设置默认搜索引擎的名称
    // 获取搜索引擎选项
    const searchEngines = vscode.workspace.getConfiguration('logSearchText').get<SearchEngines>('searchEngines') ?? {} as SearchEngines;
    // 获取用户选择的搜索引擎配置
    const selectedSearchEngine = vscode.workspace.getConfiguration('logSearchText').get('selectedSearchEngine') || defaultSearchEngine
    // 获取默认搜索引擎的 URL
    const defaultSearchEngineUrl = searchEngines[defaultSearchEngine] || '';
    // 获取用户选择的默认搜索引擎的 URL
    const selectedSearchEngineUrl = searchEngines[selectedSearchEngine as keyof SearchEngines] || defaultSearchEngineUrl;
    // 构造搜索引擎搜索的 URL
    const searchUrl = selectedSearchEngineUrl + encodeURIComponent(selectedText);

    // 在默认浏览器中打开搜索
    vscode.env.openExternal(vscode.Uri.parse(searchUrl));
  } else {
    vscode.window.showInformationMessage('没有选中文本。');
  }
}
