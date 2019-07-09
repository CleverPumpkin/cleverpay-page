import { CPPageManager } from './index'

export {}

interface IPostMessage {
  postMessage: (message?: string) => void
}

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    CPPageManager: CPPageManager
  }

  var process: {
    env: {
      // For vendor libs
      NODE_ENV: 'development' | 'production'
    }
  }

  var webkit: {
    messageHandlers: {
      pageSendsMessage: IPostMessage
      closeModal: IPostMessage
    }
  }

  let pageSendsMessage: ((message: string) => void) | undefined
  let closeModal: (() => void) | undefined
}

declare module '*.json' {
  const value: any
  export default value
}
