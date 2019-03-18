import { generateExample } from './generateExample'
import { IAppState } from './generateExample/types'
import { setNewState } from './state'

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

  /**
   * 4 задачи:
   *
   * 2. установить нужное количество кнопок из мета-элемента кнопки
   * 3. всем объектам по селектору '[data-cp]' установить нужные свойства согласно конфигу
   * 4. хендлинг специальных случаев: модалка (2 вида), классы у кнопок
   */
}

window.CPPageManager = new CPPageManager()
