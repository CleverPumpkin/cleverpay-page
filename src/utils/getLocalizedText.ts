import { ILocalizableText, IAppState } from '../types'

export function getLocalizedText(
  data: ILocalizableText,
  settings: IAppState['standard']['settings']
): string {
  const { locale, fallbackLocale } = settings
  return data[locale] || data[fallbackLocale]
}
