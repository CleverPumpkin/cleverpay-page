/* eslint-disable @typescript-eslint/camelcase */
import { random, sample } from 'lodash-es'
import { ILocalizableText } from '../types'
import { generateWords } from '../utils/generateText'

interface IExampleArg {
  fieldName: string
  required: boolean
  defaultValue?: IPossibleValueTypes
  choices?: IPossibleValueTypes[]
}

export type IPossibleValueTypes = string | number | ILocalizableText | undefined

const randomBool = (): boolean => random(1, 100) > 75

export const configValueMap: { [dataType: string]: (args: IExampleArg) => IPossibleValueTypes } = {
  localizable: ({ fieldName }) => {
    const text = `${fieldName}: ${generateWords(random(1, 20))}`
    return {
      'en-US': text,
      'es-ES': text,
      'ru-RU': text,
    }
  },
  string: ({ fieldName, choices, defaultValue }) => {
    if (defaultValue && randomBool()) {
      return defaultValue
    }
    return sample(choices) || `${generateWords(random(1, 10))} (${fieldName})`
  },
  number: ({ choices, defaultValue }) => {
    if (defaultValue && randomBool()) {
      return defaultValue
    }
    return sample(choices) || random(1, 1000)
  },
  color: ({ choices, defaultValue }) => {
    if (defaultValue && randomBool()) {
      return defaultValue
    }
    return sample(choices) || `#${Math.floor(Math.random() * 16777215).toString(16)}`
  },
  buttonText: () => ({
    'en-US': `Buy for {price}`,
    'es-ES': `Comprar por {price}`,
    'ru-RU': `Купить за {price}`,
  }),
}
