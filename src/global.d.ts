import { CPPageManager } from './index'
import { IConfig, IAppState } from './generateExample/types'

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
      CPConfig: IConfig
      CPTimerRegenerateConfig: number
      CPExampleData?: IAppState
    }
  }
}

declare module '*.json' {
  const value: any
  export default value
}
