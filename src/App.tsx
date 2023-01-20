import { styled } from '@mui/material'
import Routes from './Routes'

const StyledRoot = styled('div')({
  fontFamily: 'Helvetica, Arial, sans-serif',
})

function App() {
  return (
    <StyledRoot>
      <Routes />
    </StyledRoot>
  )
}

export default App
