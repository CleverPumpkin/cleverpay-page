/* eslint-disable @typescript-eslint/camelcase */
import { random } from 'lodash-es'
import { ILocalizableText } from '../types'

interface IExampleArg {
  fieldName: string
  required: boolean
  defaultValue?: IPossibleValueTypes
  choices?: IPossibleValueTypes[]
}

export type IPossibleValueTypes = string | number | ILocalizableText | undefined

export const configValueMap: { [dataType: string]: (args: IExampleArg) => IPossibleValueTypes } = {
  localizable: ({ fieldName }) => ({
    en_US: `Hello! {price} (${fieldName})`,
    es_ES: `¡Hola! {price} (${fieldName})`,
    ru_RU: `Привет! {price} (${fieldName})`,
  }),
  string: ({ fieldName }) =>
    `${Math.random()
      .toString(36)
      .substring(7)} (${fieldName})`,
  number: () => random(1, 100),
  color: () => `#${Math.floor(Math.random() * 16777215).toString(16)}`,
}
