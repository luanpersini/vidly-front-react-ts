import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string
    colors: {
      primary: string
      secundary: string

      shade0: string
      shade1: string
      shade2: string
      shade3: string
      shade4: string
      shade5: string
      shade6: string

      background: string
      text: string
    }
  }
}
