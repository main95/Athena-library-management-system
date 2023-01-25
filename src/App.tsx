import { styled, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Routes from './Routes'
import theme from './theme'

const StyledRoot = styled('div')({
  fontFamily: 'Helvetica, Arial, sans-serif',
})

function App() {
  return (
    <StyledRoot>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Provider>
    </StyledRoot>
  )
}

export default App
