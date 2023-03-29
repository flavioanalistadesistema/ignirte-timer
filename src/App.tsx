import { ThemeProvider } from 'styled-components'
import { Router } from '../Router'
import { GlobolStyled } from './styles/global'

import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'
import { CycleContextProvider } from './contexts/CyclesContext'
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobolStyled />
    </ThemeProvider>
  )
}
