import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Dash from "./components/Dash";
import CGPACalculator from "./components/CGPA_Calculator";
import SGPACalculator from "./components/SGPA_Calculator";
import History from "./components/History";
import Calendar from "./components/Calender";
const theme = createTheme({
  palette:{
    primary: {
      main: '#9155FD', 
    },
    background: {
      default: '#eff0f6'
    }
  }
})

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Login />
    },
    {
      path: '/Dashboard', element: <Dash />, children: [
        {
          path: 'SGPA-calculator', element: <SGPACalculator />
        },
        { path: 'CGPA-calculator', element: <CGPACalculator /> },
        {
          path: 'History', element: <History />
        },
        {
          path: 'Calendar', element: <Calendar />
        }
      ]
    },

  ])

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;