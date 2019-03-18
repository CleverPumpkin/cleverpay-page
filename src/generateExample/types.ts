enum PropertyTypes {
  string = 'string',
  number = 'number',
  localizable = 'localizable',
  color = 'color',
}

export interface IFieldData {
  type: PropertyTypes
  required?: boolean
  choices?: string[]
  default?: string
}

export interface IConfig {
  [field: string]: IFieldData | IConfig
}

export interface IParsedFieldData {
  example: any
  default?: string
}

export interface IParsedConfig {
  [field: string]: IParsedConfig | IParsedFieldData
}

interface IRecursiveObject {
  [key: string]: any | IRecursiveObject
}

export interface IAppState {
  standard: {
    buttons: { [key: string]: any }[]
    [key: string]: any
  }
  runtime: { [key: string]: any }
  interface: IRecursiveObject
}
