import 'styled-components'

import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

/**
 * Overrides the default theme defined in the styled components config
 * Enables access to the default theme through the props.theme property
 */
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
