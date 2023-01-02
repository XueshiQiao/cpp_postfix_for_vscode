import { toNamespacedPath } from "path"
import { IPostfixTemplate } from "./template"
import { BaseTemplate } from "./templates/baseTemplate"
type Constructor<T = any> = new (...args: any[]) => T

export type StringKey<T = any> = { [key in string]: T }

export type InstanceContainerType = {
  postfixTemplates: Array<IPostfixTemplate>
}

interface ComplectionTemplateDefinition {
  name: string;
  description: string;
  body: string;
  mode?: string;
}

function isPostfixTemplate(props: any) {
  return typeof (props)['buildCompletionItem'] !== 'undefined' &&
    typeof (props)['canUse'] !== 'undefined'
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ComplectionTemplate(...templates: ComplectionTemplateDefinition[]) {
  return (c: Constructor) => {
    if (isPostfixTemplate(c.prototype) && c.prototype instanceof BaseTemplate) {
      for (const template of templates) {
        console.log("loading template ==> ", "[", c.name, "]", template)
        iocContainer.loadTemplates().push(new c(template.name, template.description, template.body, template.mode))
      }
    }
  }
}

class IocContainer {
  private readonly instanceContainer: InstanceContainerType = {
    postfixTemplates: []
  }

  public templates() {
    if (this.instanceContainer.postfixTemplates) {
    }
    return this.instanceContainer.postfixTemplates
  }

  public loadTemplates() {
    if (!this.instanceContainer.postfixTemplates) {
      this.instanceContainer.postfixTemplates = []
    }
    return this.instanceContainer.postfixTemplates
  }
}



export const iocContainer = new IocContainer()
