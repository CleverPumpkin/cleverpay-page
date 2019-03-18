import { IAppState } from '../generateExample/types'
import { customizeElement, DataAttributeValues } from '../customize'

const parentSelector = document.querySelector('#cp-buttons') as HTMLElement
const metaButton = parentSelector.querySelector('.cp-button') as HTMLElement
if (metaButton) {
  // Making the Meta button invisible to anybody
  metaButton.style.display = 'none'

  // Just a way to make directive Nth child in CSS work properly
  metaButton.classList.remove('cp-button')
} else {
  console.error(
    'Please create a meta-button element. It should have a class ".cp-button" and reside inside "#cp-buttons".'
  )
}

export function syncButtons(state: IAppState): void {
  // Removing all the old buttons at all
  parentSelector.querySelectorAll('.cp-button').forEach(item => item.remove())

  state.standard.buttons.map(button => {
    const newButton = metaButton.cloneNode(true) as HTMLElement

    // We rollback all the local changes to meta-button
    newButton.style.display = ''
    newButton.classList.add('cp-button')

    newButton
      .querySelectorAll<HTMLElement>(`[${DataAttributeValues.button}]`)
      .forEach(element => customizeElement(element, DataAttributeValues.button, button))

    // ... and append it to the DOM
    parentSelector.appendChild(newButton)
  })
}
