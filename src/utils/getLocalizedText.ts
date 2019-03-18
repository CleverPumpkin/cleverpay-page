import { IAppState } from '../generateExample/types'

interface ILocalizedText {
  [locale: string]: string
}

export function getLocalizedText(data: ILocalizedText, settings: IAppState): string {
  const { locale, fallbackLocale } = settings.standard.settings

  return data[locale] || data[fallbackLocale]
}
