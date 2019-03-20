import { provideAppState } from './provideAppState'
import example from './example.json'
import { IAppState } from '../types'

export function generateExample(): IAppState {
  if (process.env.CPExampleData) {
    return process.env.CPExampleData
  }

  if (!process.env.CPConfig) {
    throw new Error('Provide CleverPay config.json file')
  }

  return provideAppState(process.env.CPConfig, example)
}
