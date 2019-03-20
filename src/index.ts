import { generateExample } from './generateExample'
import { setNewState } from './state'
import { IAppState } from './types'
import { pageSendsMessageNative } from './bridge'
import { toggleSemiActiveOverlay } from './state/overlay'
import { toggleButtonAvailability } from './state/buttons/states'

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

  public purchaseRequest(productId: string): void {
    toggleSemiActiveOverlay()
    pageSendsMessageNative(JSON.stringify({ type: 'purchase', productId }))
    if (process.env.NODE_ENV === 'development') {
      setTimeout(this.purchaseFinished, 2500)
    }
  }

  public purchaseFinished(): void {
    toggleSemiActiveOverlay()
    toggleButtonAvailability()
  }

  public screenOpen(): void {
    pageSendsMessageNative(JSON.stringify({ type: 'screenOpen' }))
  }
}

window.CPPageManager = new CPPageManager()
