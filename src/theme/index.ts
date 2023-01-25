import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#457B9D',
    },
    secondary: {
      main: '#A8DADC',
    },
    error: {
      main: '#E63946',
    },
    warning: {
      main: '#A8DADC',
    },
    info: {
      main: '#F1FAEE',
    },
    success: {
      main: '#1D3557',
    },
  },
})

export default theme