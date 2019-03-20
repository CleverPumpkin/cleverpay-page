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

export function provideAppState(rawConfig: IRawConfig, exampleStarter: IAppState): IAppState {
  const result: IAppState = {
    standard: exampleStarter.standard,
    runtime: exampleStarter.runtime,
    interface: {},
  }

  const parsedConfig = parseConfig(rawConfig)

  const minButtonCount = parseAttributeCount(DataAttributeValues.minCounter) || 1
  const maxButtonCount = parseAttributeCount(DataAttributeValues.maxCounter) || 3

  result.standard.buttons = range(random(minButtonCount, maxButtonCount)).map(index => {
    return {
      order: index + 1,
      productId: `premium.test.product.${index}`,
      price: random(0.99, 10.99, true),
      currency: sample(currencyChoices) as string,
    }
  })
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