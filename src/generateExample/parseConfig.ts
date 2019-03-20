import { IConfigExampleGenerator, IRawConfig } from './types'
import { configValueMap } from './configValueMap'
import { forOwn, isArray, includes, isEmpty } from 'lodash-es'

export function parseConfig(dataObject: IRawConfig): IConfigExampleGenerator {
  const result: IConfigExampleGenerator = {}

  forOwn(dataObject, (configValue, field) => {
    if (typeof configValue.required === 'undefined') {
      // "required" parameter is not required by default and has the default value of true
      configValue.required = true
    }

    // Asserting, that default value is present in choices
    if (isArray(configValue.choices) && !isEmpty(configValue.choices)) {
      if (configValue.default && !includes(configValue.choices, configValue.default)) {
        console.error(
          `[${field}] Default value "${
            configValue.default
          }" is not included in choices: "${configValue.choices.join(', ')}"`
        )
      }
    }

    /**
     * Other assertions:
     * 1. no choice or default for localizable
     * 2. default value is of correct type (color, number and string)
     */

    result[field] = () => {
      return configValueMap[configValue.type]({
        fieldName: field,
        required: configValue.required as boolean,
      })
    }
  })

  return result
}
