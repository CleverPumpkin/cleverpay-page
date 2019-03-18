import { random } from 'lodash'

export const configValueMap = {
  localizable: {
    tsType: 'ICPLocalizableString',
    exampleValue: (fieldName: string) => ({
      en_US: `Hello! (${fieldName})`,
      es_ES: `¡Hola! (${fieldName})`,
      ru_RU: `Привет! (${fieldName})`,
    }),
  },
  string: {
    tsType: 'string',
    exampleValue: (fieldName: string) =>
      `${Math.random()
        .toString(36)
        .substring(7)} (${fieldName})`,
  },
  number: {
    tsType: 'number',
    exampleValue: () => random(1, 100),
  },
  color: {
    tsType: 'string',
    exampleValue: () => `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  },
}
