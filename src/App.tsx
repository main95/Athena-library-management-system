import { styled } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Routes from './Routes'

const StyledRoot = styled('div')({
  fontFamily: 'Helvetica, Arial, sans-serif',
})

function App() {
  return (
    <StyledRoot>
      <Provider store={store}>
        <Routes />
      </Provider>
    </StyledRoot>
  )
}

export default App
