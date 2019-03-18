import { IAppState } from '../generateExample/types'
import { customizeElement, DataAttributeValues } from '../customize'

export function setFromDataAttributes(state: IAppState): void {
  const elements = document.querySelectorAll<HTMLElement>(`[${DataAttributeValues.usual}]`)

  elements.forEach(element => customizeElement(element, DataAttributeValues.usual, state.interface))
}
