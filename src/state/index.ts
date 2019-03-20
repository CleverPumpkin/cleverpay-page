import { hideInitialOverlay } from './overlay'
import { setFromDataAttributes } from './dataAttributes'
import { syncButtons } from './buttons'
import { IAppState } from '../types'

export function setNewState(newState: IAppState): void {
  setFromDataAttributes(newState)
  syncButtons(newState)
  hideInitialOverlay()
}
