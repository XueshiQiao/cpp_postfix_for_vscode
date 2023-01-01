import * as vscode from 'vscode'
import { adjustMultilineIndentation, getIndentCharacters, indent } from './utils/utils'

const COMPLETION_ITEM_TITLE = 'Postfix Complection'

export class CompletionItemBuilder {
  private item: vscode.CompletionItem
  private code: string
  private line: number
  private mode: string
  private replaceRangeStartIndx: number
  private dotIdx: number
  constructor(name: string, inlineText: string, line: number, mode: string, replaceRangeStartIndx: number, dotIdx: number) {
    // console.log("name", name, "inlineText", inlineText, "line", line, "replaceRangeStartIndx", replaceRangeStartIndx, "dotIdx", dotIdx)
    this.item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Snippet)
    this.item.detail = COMPLETION_ITEM_TITLE
    this.replaceRangeStartIndx = replaceRangeStartIndx
    // this.code = adjustMultilineIndentation(inlineText, 4)
    this.code = inlineText.substr(replaceRangeStartIndx)
    this.line = line
    this.mode = mode
    this.dotIdx = dotIdx
  }

  public static create = (label: string, inlineText: string, line: number, mode: string, replaceRangeStartIndx: number, dotIdx: number) => new CompletionItemBuilder(label, inlineText, line, mode, replaceRangeStartIndx, dotIdx)

  public description = (description: string) => {
    this.item.detail = this.item.detail + " (" + description + ")"
    return this
  }
  public command = (command: vscode.Command) => {
    this.item.command = command
    return this
  }

  public insertText = (insertText?: string) => {
    this.item.insertText = insertText
    return this
  }

  public replace = (replacement: string, useSnippets?: boolean): CompletionItemBuilder => {
    if (useSnippets) {
      const escapedCode = this.code.replace('$', '\\$')
      this.item.insertText = new vscode.SnippetString(
        replacement.replace(new RegExp('{{expr}}', 'g'), escapedCode)
          .replace(new RegExp('{{expr::uppercase}}', 'g'), escapedCode.toUpperCase())
          .replace(new RegExp('{{expr::lowercase}}', 'g'), escapedCode.toLowerCase())
          .replace(new RegExp('{{indent}}', 'g'), getIndentCharacters())

      )
    } else {
      this.item.insertText = replacement.replace(new RegExp('{{expr}}', 'g'), this.code)
        .replace(new RegExp('{{expr::uppercase}}', 'g'), this.code.toUpperCase())
        .replace(new RegExp('{{expr::lowercase}}', 'g'), this.code.toLowerCase())
        .replace(new RegExp('{{indent}}', 'g'), getIndentCharacters())
    }

    const rangeToDelete = new vscode.Range(
      new vscode.Position(this.line, this.replaceRangeStartIndx),
      new vscode.Position(this.line, this.dotIdx + 1) // accomodate 1 character for the dot
    )

    this.item.additionalTextEdits = [
      vscode.TextEdit.delete(rangeToDelete)
    ]

    return this
  }

  public build = () => this.item
}
