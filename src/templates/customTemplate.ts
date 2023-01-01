import * as ts from 'typescript'
import * as vscode from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { IPostfixTemplate } from '../template'
import { BaseTemplate } from './baseTemplate'

export class CustomTemplate extends BaseTemplate implements IPostfixTemplate {
  constructor(language: string,  name: string, description: string,  body: string, mode: string) {
    super(language, name, description, body, mode)
  }

  getLanguage(): string {
    return this.language
  }

  canUse(): boolean {
    return true
  }
}
