import { IConfigExampleGenerator, IRawConfig, PropertyTypes } from './types'
import { configValueMap } from './configValueMap'
import { forOwn, isArray, includes, isEmpty, isArrayLike } from 'lodash-es'

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
        const message = `[${field}] Default value "${
          configValue.default
        }" is not included in choices: "${configValue.choices.join(', ')}"`
        throw new Error(message)
      }
    }

    // Asserting, that localizable doesn't have a default or choice
    if (
      configValue.type === PropertyTypes.localizable &&
      (configValue.choices || configValue.default)
    ) {
      const message = `[${field}] Type ${
        PropertyTypes.localizable
      } cannot have either choices or default value`
      throw new Error(message)
    }

    function typeCheckValue(
      type: PropertyTypes,
      value: string | number,
      place: 'default' | 'choice'
    ): void {
      const numberAndStringMatchesDefaultType =
        (type === PropertyTypes.number || type === PropertyTypes.string) &&
        typeof value !== configValue.type

      const colorMatchesDefaultType =
        type === PropertyTypes.color && !/^#([0-9a-f]{3}){1,2}$/i.test(value as string)

      if (numberAndStringMatchesDefaultType || colorMatchesDefaultType) {
        const message = `[${field}] Type ${
          configValue.type
        } is not compatible with ${place} value of ${configValue.default}`
        throw new Error(message)
      }
    }

    // Asserting that default value matches the type of field
    if (configValue.default) {
      typeCheckValue(configValue.type, configValue.default, 'default')
    }

    // Asserting that choices match the type of field
    if (configValue.choices) {
      if (isArrayLike(configValue.choices)) {
        configValue.choices.map(item => typeCheckValue(configValue.type, item, 'choice'))
      } else {
        throw new Error(`[${field}] Choices must be an array of options`)
      }
    }

    result[field] = () => {
      return configValueMap[configValue.type]({
        fieldName: field,
        required: configValue.required as boolean,
        choices: configValue.choices,
        defaultValue: configValue.default,
      })
    }
  })

  return result
}
