import { forOwn } from 'lodash'
import { IParsedConfig, IParsedFieldData } from './types'

export function recursivePropertyGetter(
  iteratorObject: IParsedConfig,
  field: keyof IParsedFieldData
): any {
  const result: any = {}
  forOwn(iteratorObject, (value, key) => {
    if (!value[field]) {
      result[key] = recursivePropertyGetter(value as IParsedConfig, field)
      return
    }
    result[key] = value[field]
  })
  return result
}
