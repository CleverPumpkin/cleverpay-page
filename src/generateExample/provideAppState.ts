import { forOwn, startsWith, random, range, sample } from 'lodash-es'
import { IRawConfig } from './types'
import { parseConfig } from './parseConfig'
import { IAppState } from '../types'
import { buttonsParentSelector } from '../state/buttons'
import { DataAttributeValues } from '../customize'

function parseAttributeCount(attribute: string): number | undefined {
  const rawResult = buttonsParentSelector.getAttribute(attribute)
  if (rawResult) {
    try {
      return parseInt(rawResult)
    } catch {}
  }
  return
}

const currencyChoices = ['USD', 'EUR', 'CHM', 'RUB', 'BRL', 'JPY']

export function provideAppState(rawConfig: IRawConfig): IAppState {
  const result: IAppState = {
    standard: { settings: { locale: 'ru-RU', fallbackLocale: 'en-US' }, buttons: [] },
    interface: {},
  }

  const parsedConfig = parseConfig(rawConfig)

  // Generating a random set of buttons
  const minButtonCount = parseAttributeCount(DataAttributeValues.minCounter) || 1
  const maxButtonCount = parseAttributeCount(DataAttributeValues.maxCounter) || 3
  result.standard.buttons = range(random(minButtonCount, maxButtonCount)).map(index => ({
    order: index + 1,
    productId: `premium.test.product.${index}`,
    price: random(0, 10) + 0.99,
    currency: sample(currencyChoices) as string,
  }))

  const buttonStartConfig = 'button.'
  forOwn(parsedConfig, (exampleGenerator, field) => {
    // It is a hardcoded value for config, that holds all the customization options for buttons.
    if (startsWith(field, buttonStartConfig)) {
      result.standard.buttons = result.standard.buttons.map(button => {
        const customization = button.customization ? button.customization : {}
        customization[field.replace(buttonStartConfig, '')] = exampleGenerator()
        return {
          ...button,
          customization,
        }
      })
    } else {
      if (result.interface) {
        result.interface[field] = exampleGenerator()
      }
    }
  })

  return result
}
