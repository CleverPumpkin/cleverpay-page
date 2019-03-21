import { customizeElement, DataAttributeValues } from '../../customize'
import { flatten } from 'lodash-es'
import { IAppState, ILocalizableText } from '../../types'
import { getLocalizedText } from '../../utils/getLocalizedText'

export const buttonsParentSelector = document.querySelector('#cp-buttons') as HTMLElement
const metaButton = buttonsParentSelector.querySelector('.cp-button') as HTMLElement
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

const buttonPricePlaceholder = '{price}'

export function syncButtons(state: IAppState): void {
  // Removing all the old buttons at all
  buttonsParentSelector.querySelectorAll('.cp-button').forEach(item => item.remove())
  const normalizedLocale = state.standard.settings.locale.replace('_', '-')

  state.standard.buttons.map(button => {
    const newButton = metaButton.cloneNode(true) as HTMLElement

    // We rollback all the local changes to meta-button
    newButton.style.display = ''
    newButton.classList.add('cp-button')

    newButton
      .querySelectorAll<HTMLElement>(`[${DataAttributeValues.button}]`)
      .forEach(element =>
        customizeElement(
          element,
          DataAttributeValues.button,
          button.customization,
          state.standard.settings
        )
      )

    newButton
      .querySelectorAll<HTMLElement>(`[${DataAttributeValues.buttonPrice}]`)
      .forEach(element => {
        // Using browser provided localization library
        const formatter = new Intl.NumberFormat(normalizedLocale, {
          style: 'currency',
          currency: button.currency,
        })

        if (button.price && button.customization && button.customization.text) {
          // Product may have already loaded
          const translatedButtonText = getLocalizedText(
            button.customization.text as ILocalizableText,
            state.standard.settings
          )
          // Generating a span-element for every node of text, that is splitted by placeholder {price}
          flatten(
            translatedButtonText.split(buttonPricePlaceholder).map((item, index, arr) => {
              const result = []
              const textSpan = document.createElement('span')
              textSpan.textContent = item
              result.push(textSpan)

              if (index + 1 < arr.length) {
                const priceSpan = document.createElement('span')
                priceSpan.classList.add('cp-buttonPrice')
                // Here we paste a non-breaking space &nbsp;
                priceSpan.textContent = ` ${formatter.format(button.price as number)} `
                result.push(priceSpan)
              }
              return result
            })
          ).map(child => element.appendChild(child))
        }
      })

    // If the price isn't loaded yet, we add loading class
    if (button.price) {
      newButton.classList.remove('is-loading')
      newButton.addEventListener('click', e => {
        e.preventDefault()
        window.CPPageManager.purchaseRequest(button.productId)
      })
    } else {
      newButton.classList.add('is-loading')
    }

    // ... and append it to the DOM
    buttonsParentSelector.appendChild(newButton)
  })
}
