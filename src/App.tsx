import { ThemeProvider } from 'styled-components'
import { Button } from './component/Button'
import { GlobolStyled } from './styles/global'

import { defaultTheme } from './styles/themes/default'
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="success" />
      <Button variant="danger" />
      <Button />
      <GlobolStyled />
    </ThemeProvider>
  )
}
