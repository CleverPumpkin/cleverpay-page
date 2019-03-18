import { IAppState } from '../generateExample/types'
import { hideInitialOverlay } from './overlay'
import { setFromDataAttributes } from './dataAttributes'

export function setNewState(newState: IAppState): void {
  setFromDataAttributes(newState)
  hideInitialOverlay()
}
