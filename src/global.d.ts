import { CPPageManager } from './index'
import { IRawConfig } from './generateExample/types'
import { IAppState } from './types'

export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    CPPageManager: CPPageManager
  }

  var process: {
    env: {
      // For vendor libs
      NODE_ENV: 'development' | 'production'
      CPConfig: IRawConfig
      CPTimerRegenerateConfig: number
      CPExampleData?: IAppState
    }
  }
}

declare module '*.json' {
  const value: any
  export default value
}
