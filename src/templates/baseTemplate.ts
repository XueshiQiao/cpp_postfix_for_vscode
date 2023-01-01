import { CompletionItemBuilder } from "../completionItemBuilder"
import { IPostfixTemplate } from "../template"
import * as vscode from 'vscode'

export interface ICustomTemplateDefinition {
  name: string
  language: string
  description: string
  body: string
  // add mode field to support multiple mode, such as word and line
  mode?: string
}

export abstract class BaseTemplate implements IPostfixTemplate {

    abstract getLanguage(): string

    getMode(): string {
      return this.mode ? this.mode : "line"
    }

    constructor(public language: string,
      public name: string,
      public description: string,
      public body: string,
      public mode?: string,
    ) {}

    buildCompletionItem(inlineText: string, line: number, replaceRangeStartIndx:number, dotIdx: number): vscode.CompletionItem {
      return CompletionItemBuilder
        .create(this.name, inlineText, line, this.getMode(), replaceRangeStartIndx, dotIdx)
        .description(this.description)
        .replace(this.body, true)
        .build()
    }
    abstract canUse(inlineText: string): boolean
  }
