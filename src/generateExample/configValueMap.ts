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

const randomBool = (chance = 75): boolean => random(1, 100) < chance
function generateResults(
  fn: (fieldname: string) => IPossibleValueTypes
): (args: IExampleArg) => IPossibleValueTypes {
  return (args: IExampleArg) => {
    const { defaultValue, required, fieldName, choices } = args
    if (!required && randomBool(30)) {
      return
    }
    if (defaultValue && randomBool(75)) {
      return defaultValue
    }
    if (choices) {
      return sample(choices)
    }
    return fn(fieldName)
  }
}

export const configValueMap: { [dataType: string]: (args: IExampleArg) => IPossibleValueTypes } = {
  localizable: generateResults(fieldName => {
    const text = `${fieldName}: ${generateWords(random(1, 20))}`
    return {
      'en-US': text,
      'es-ES': text,
      'ru-RU': text,
    }
  }),
  string: generateResults(fieldName => `${generateWords(random(1, 10))} (${fieldName})`),
  number: generateResults(() => random(1, 1000)),
  color: generateResults(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
  buttonText: () => ({
    'en-US': `Buy for {price}`,
    'es-ES': `Comprar por {price}`,
    'ru-RU': `Купить за {price}`,
  }),
}
