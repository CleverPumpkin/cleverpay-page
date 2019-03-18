import { get, forOwn } from 'lodash-es'
import { getLocalizedText } from './utils/getLocalizedText'

interface IElementConfig {
  html?: string
  style?: {
    [attribute: string]: string
  }
  class?: string
}

export enum DataAttributeValues {
  usual = 'data-cp',
  button = 'data-cp-button',
}

export function customizeElement(
  element: HTMLElement,
  dataAttribute: DataAttributeValues,
  stateSlice: any
): void {
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
    const setResult = get(stateSlice, elementConfig.html)
    // It can be a localizable, number, color or string. We add a special case for localizable
    if (typeof setResult === 'object') {
      element.innerHTML = getLocalizedText(setResult, stateSlice)
    } else {
      element.innerHTML = setResult
    }
  }

  if (elementConfig.class) {
    // Setting class directive
    const classResult = get(stateSlice, elementConfig.class)
    if (typeof classResult === 'string') {
      element.classList.add(classResult)
    }
  }

  if (elementConfig.style) {
    // Setting element directive. No explicit validations occur here.
    forOwn(elementConfig.style, (value: string, key: string) => {
      element.style[key as any] = get(stateSlice, value)
    })
  }
}
