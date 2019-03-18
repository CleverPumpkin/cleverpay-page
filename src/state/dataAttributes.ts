import { IAppState } from '../generateExample/types'
import { get } from 'lodash-es'
import { getLocalizedText } from '../utils/getLocalizedText'
import { forOwn } from 'lodash-es'

const dataAttribute = 'data-cp'
function addInterfacePath(path: string): string {
  return `interface.${path}`
}

interface IElementConfig {
  html?: string
  style?: {
    [attribute: string]: string
  }
  class?: string
}

export function setFromDataAttributes(state: IAppState): void {
  const elements = document.querySelectorAll(`[${dataAttribute}]`) as NodeListOf<HTMLElement>
  elements.forEach(element => {
    // Getting raw JSON-object from data attributes
    const rawAttributeData = element.getAttribute(dataAttribute)
    let elementConfig: IElementConfig

    try {
      elementConfig = JSON.parse(rawAttributeData as string)
    } catch (e) {
      const message = `Unknown error while parsing "${rawAttributeData}" for attribute "${dataAttribute}"`
      return console.error(message)
    }

    if (elementConfig.html) {
      // Setting html direcrive
      const setResult = get(state, addInterfacePath(elementConfig.html))
      // It can be a localizable, number, color or string. We add a special case for localizable
      if (typeof setResult === 'object') {
        element.innerHTML = getLocalizedText(setResult, state)
      } else {
        element.innerHTML = setResult
      }
    }

    if (elementConfig.class) {
      // Setting class directive
      const classResult = get(state, addInterfacePath(elementConfig.class))
      if (typeof classResult === 'string') {
        element.classList.add(classResult)
      }
    }

    if (elementConfig.style) {
      // Setting element directive. No explicit validations occur here.
      forOwn(elementConfig.style, (value: string, key: string) => {
        element.style[key as any] = get(state, addInterfacePath(value))
      })
    }
  })
}
