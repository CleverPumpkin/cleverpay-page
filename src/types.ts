export interface IAppState {
  standard: {
    settings: {
      locale: string
      fallbackLocale: string
    }
    buttons: {
      order: number
      productId: string
      price: number
      currency: string
      customization?: ICustomizationData
    }[]
  }
  runtime?: { [key: string]: ICustomizationData }
  interface?: ICustomizationData
}

export interface ILocalizableText {
  [locale: string]: string
}

interface ICustomizationData {
  [key: string]: string | number | ILocalizableText | undefined
}
