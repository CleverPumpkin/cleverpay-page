import { IAppState } from './types'
import { parseConfig } from './parseConfig'
import { recursivePropertyGetter } from './recursivePropGetter'
import example from './example.json'

export function generateExample(): IAppState {
  if (process.env.CPExampleData) {
    return process.env.CPExampleData
  }

  if (!process.env.CPConfig) {
    throw new Error('Provide CleverPay config.json file')
  }

  return {
    ...example,
    interface: recursivePropertyGetter(parseConfig(process.env.CPConfig), 'example'),
  }
}
