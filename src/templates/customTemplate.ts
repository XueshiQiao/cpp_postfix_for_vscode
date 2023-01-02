import * as ts from 'typescript'
import * as vscode from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { IPostfixTemplate } from '../template'
import { BaseTemplate } from './baseTemplate'

export class CustomTemplate extends BaseTemplate implements IPostfixTemplate {
  constructor(name: string, description: string,  body: string, mode: string) {
    super(name, description, body, mode)
  }

  canUse(): boolean {
    return true
  }
}
