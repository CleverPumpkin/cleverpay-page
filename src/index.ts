import { setNewState } from './state'
import { IAppState } from './types'
import { pageSendsMessageNative } from './bridge'
import { toggleSemiActiveOverlay } from './state/overlay'
import { toggleButtonAvailability } from './state/buttons/states'
import { IRawConfig } from './generateExample/types'
import { provideAppState } from './generateExample/provideAppState'

export class CPPageManager {
  private timer?: number

  public initExampleGenerator(args: {
    config: IRawConfig
    example?: IAppState
    timer?: number
  }): void {
    if (process.env.NODE_ENV === 'development') {
      const { config, example, timer } = args
      if (!config) {
        throw new Error('Provide CleverPay config')
      }

      clearInterval(this.timer)

      // Here we set example data inside the SDK. It will only work during development.
      const exampleGenerator = (): void => {
        this.setNewState(example ? example : provideAppState(config))
      }

      // If timer is provided, we run example generator in a cycle
      timer ? (this.timer = setInterval(exampleGenerator, timer)) : exampleGenerator()
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
