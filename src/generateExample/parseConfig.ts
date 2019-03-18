import { IParsedConfig, IConfig, IFieldData } from './types'
import { configValueMap } from './configValueMap'
import { forOwn, isArray, includes, isEmpty } from 'lodash-es'

export function parseConfig(dataObject: IConfig): IParsedConfig {
  const result: IParsedConfig = {}
  forOwn(dataObject, (value, key) => {
    if (!value.type) {
      result[key] = parseConfig(value as IConfig)
      return
    }

    const typedValue = value as IFieldData

    // Asserting, that default value is present in choices
    if (isArray(typedValue.choices) && !isEmpty(typedValue.choices)) {
      if (typedValue.default && !includes(typedValue.choices, typedValue.default)) {
        console.error(
          `[${key}] Default value "${
            typedValue.default
          }" is not included in choices: "${typedValue.choices.join(', ')}"`
        )
      }
    }

    result[key] = {
      example: configValueMap[typedValue.type].exampleValue(key),
      default: typedValue.default,
    }
  })

  return result
}
