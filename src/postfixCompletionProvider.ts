import * as vsc from 'vscode'
import * as _ from 'lodash'

import { IPostfixTemplate } from './template'
import { loadBuiltinTemplates, loadCustomTemplates } from './templates'

let currentSuggestion: any = undefined

export class PostfixCompletionProvider implements vsc.CompletionItemProvider {
  private templates: IPostfixTemplate[] = []
  constructor() {
    this.templates = [
      ...loadBuiltinTemplates(),
      ...loadCustomTemplates()
    ]
  }

  provideCompletionItems(document: vsc.TextDocument, position: vsc.Position, _token: vsc.CancellationToken): vsc.CompletionItem[] | vsc.CompletionList | Thenable<vsc.CompletionItem[] | vsc.CompletionList> {
    const line = document.lineAt(position.line)
    const dotIdx = line.text.lastIndexOf('.', position.character)

    if (dotIdx === -1) {
      return []
    }

    const lineText = document.getText(new vsc.Range(
      new vsc.Position(position.line, 0),
      new vsc.Position(position.line, dotIdx)
    ))

    try {
      return this.templates
        .filter(t => t.canUse(lineText))
        .map(t => {
          var replaceRangeStartIndex = 0;
          if (t.getMode() === 'word') {
            const lastSpaceIndex = lineText.lastIndexOf(' ')
            const lastLeftBraceIndex = lineText.lastIndexOf('(')
            const lastCommaIndex =  lineText.lastIndexOf(',')
            const lastSemicolonIndex = lineText.lastIndexOf(";")

            replaceRangeStartIndex = Math.max(lastSpaceIndex, lastLeftBraceIndex, lastCommaIndex, lastSemicolonIndex)
            if (replaceRangeStartIndex == -1) {
              replaceRangeStartIndex = 0;
            } else if (replaceRangeStartIndex + 1 < lineText.length) {
              replaceRangeStartIndex = replaceRangeStartIndex + 1;
            } else {
              replaceRangeStartIndex = 0
            }
          } else if (t.getMode() === 'line') {
            replaceRangeStartIndex = line.firstNonWhitespaceCharacterIndex;
          } else {
            replaceRangeStartIndex = 0;
            console.error("unsupported mode: ", t.getMode())
          }
          // console.log("~~~~~~~~~~~~template: ", t, ", mode:", t.getMode(), ", startIndex:", startIndex, ", lineText:", "[" + lineText + "]");
          return t.buildCompletionItem(lineText, position.line, replaceRangeStartIndex, dotIdx)
        })
    } catch (err) {
      console.error('Error while building postfix autocomplete items:')
      console.error(err)

      return []
    }
  }

  resolveCompletionItem(item: vsc.CompletionItem, _token: vsc.CancellationToken): vsc.ProviderResult<vsc.CompletionItem> {
    currentSuggestion = item.label
    return item
  }

}

export const getCurrentSuggestion = () => currentSuggestion
export const resetCurrentSuggestion = () => currentSuggestion = undefined
