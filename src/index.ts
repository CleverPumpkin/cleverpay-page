import { generateExample } from './generateExample'
import { setNewState } from './state'
import { IAppState } from './types'

export class CPPageManager {
  public constructor() {
    if (process.env.NODE_ENV === 'development') {
      // Here we set example data inside the SDK. It will only work during development.
      const exampleGenerator = (): void => {
        const exampleData = generateExample()
        if (exampleData) {
          this.setNewState(exampleData)
        }
      }

      const timerDelay = process.env.CPTimerRegenerateConfig
      if (timerDelay && typeof timerDelay === 'number') {
        setInterval(exampleGenerator, timerDelay)
      } else {
        exampleGenerator()
      }
    }
  }

  public setNewState(state: IAppState): void {
    setNewState(state)
  }
}

window.CPPageManager = new CPPageManager()
