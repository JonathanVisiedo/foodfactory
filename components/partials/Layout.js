import Header from "./Header";
import {Container, createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, Roboto, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  },
  palette: {
    primary: {
      main: '#d30027'
    },
    secondary: {
      main: '#34495E'
    }
  }
})

const Layout =  ({ children }) => {

  return (
    <ThemeProvider theme={theme}>
      <Header/>
      {children}
    </ThemeProvider>
  )

}

export default Layout