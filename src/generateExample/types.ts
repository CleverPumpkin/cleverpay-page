import { IPossibleValueTypes } from './configValueMap'

enum PropertyTypes {
  string = 'string',
  number = 'number',
  localizable = 'localizable',
  color = 'color',
}

export interface IRawConfig {
  [field: string]: {
    type: PropertyTypes
    required?: boolean
    choices?: string[]
    default?: string
  }
}

/**
 * It contains links to example generator methods. It can be called as much as you wish,
 * and the result will always be different.
 */
export interface IConfigExampleGenerator {
  [field: string]: () => IPossibleValueTypes
}
