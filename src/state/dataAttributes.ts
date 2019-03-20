import { customizeElement, DataAttributeValues } from '../customize'
import { IAppState } from '../types'

export function setFromDataAttributes(state: IAppState): void {
  const elements = document.querySelectorAll<HTMLElement>(`[${DataAttributeValues.usual}]`)

  elements.forEach(element =>
    customizeElement(element, DataAttributeValues.usual, state.interface, state.standard.settings)
  )
}
