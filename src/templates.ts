import * as vscode from 'vscode'
import * as glob from 'glob'
import { IPostfixTemplate } from './template'
import { CustomTemplate } from './templates/customTemplate'
import { iocContainer } from './container'
import { CompletionItemBuilder } from './completionItemBuilder'
import { ICustomTemplateDefinition } from './templates/baseTemplate'
import * as constants from './constants'

export const loadCustomTemplates = () => {
  const config = vscode.workspace.getConfiguration(constants.configrationKey)
  const templates = config.get<ICustomTemplateDefinition[]>(constants.templatesKeyInConfiguration)
  if (templates) {
    return templates
      .filter(v => v.name && v.body)
      .map(t =>
        new CustomTemplate(t.name, t.description, t.body, t.mode
      ) as IPostfixTemplate)
  }
  return []
}

export const loadBuiltinTemplates = () => {
  const templates = iocContainer.loadTemplates() as IPostfixTemplate[]
  return templates
}
