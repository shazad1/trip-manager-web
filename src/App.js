import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Entry from "./pages/Entry";
import ClientDash from "./pages/ClientDash";
import AdminDash from "./pages/AdminDash";
import CreateTrip from "./pages/CreateTrip";
import DeleteTrip from "./pages/DeleteTrip";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import QuickQuoteEstimate from "./pages/QuickQuoteEstimate";
import { useParams } from 'react-router-dom'

import { indigo, grey } from '@mui/material/colors';
import EntryBCT from "./pages/EntryBCT";
import AdminDashBCT from "./pages/AdminDashBCT";
import CreateTripBCT from "./pages/CreateTripBCT";


const themeCBCI = createTheme({
  palette: {

    primary: {
      light: "#516273",
      main: "#516273",
      dark: "#516273"
    },
    background: {
      default: 'D0D4D7',
      paper: '#D0D4D7',
    },
    secondary: {
      main: "#516273"
    },
    stepper: {
      iconColor: 'green' // or logic to change color
    }


  },
  stepper: {
    iconColor: 'green' // or logic to change color
  }
});

const themeBCT = createTheme({
  palette: {

    primary: {
      light: "#ffbd50",
      main: "#ffbd50",
      dark: "#ffbd50"
    },
    background: {
      default: 'D0D4D7',
      paper: '#D0D4D7',
    },
    secondary: {
      main: "#ffbd50"
    },
    stepper: {
      iconColor: 'green' // or logic to change color
    }


  },
  stepper: {
    iconColor: 'green' // or logic to change color
  }
});

function App() {

  React.useEffect(() => {
    document.title = "CBCI Tow Trip Manager"
  }, []);

  return (


    <BrowserRouter>

      <ThemeProvider theme={themeCBCI}>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/clientdash" element={<ClientDash />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/createTrip" element={<CreateTrip />} />
          <Route path="/deletetrip" element={<DeleteTrip />} />
          <Route path="/quickquoteestimate/:view" element={<QuickQuoteEstimate />} />
        </Routes>
      </ThemeProvider>
      <ThemeProvider theme={themeBCT}>
        <Routes>
          <Route path="/bct/entry" element={<EntryBCT />} />
          <Route path="/bct/admindash" element={<AdminDashBCT />} />
          <Route path="/bct/createtrip" element={<CreateTripBCT />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>

  );
}


export default App;
