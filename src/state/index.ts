import { IAppState } from '../generateExample/types'
import { hideInitialOverlay } from './overlay'
import { setFromDataAttributes } from './dataAttributes'
import { syncButtons } from './buttons'

export function setNewState(newState: IAppState): void {
  setFromDataAttributes(newState)
  syncButtons(newState)
  hideInitialOverlay()
}
