export class Debugger {
  public static log(source: DebuggerSource, message: string) {
    const universalCss =
      'font-size: 0.8rem; padding: 0.1rem 0.5rem; border-radius: 0.25rem; line-height: 1.5'
    let color = '#000'
    let backgroundColor = '#fff'

    switch (source) {
      case DebuggerSource.Entities:
        color = '#fff'
        backgroundColor = '#f00fff'
        break
    }

    console.debug(
      `%c[${source}]%c ${message}`,
      `color: ${color}; background-color: ${backgroundColor}; font-weight: bold; ${universalCss}`,
      `color: #ffffff; background-color: #000000; ${universalCss}`
    )
  }
}

export enum DebuggerSource {
  Entities = 'Entities'
}
