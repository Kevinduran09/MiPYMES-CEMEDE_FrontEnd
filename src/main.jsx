import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/components/Sidebar.css";
import { AppRouter } from "./components/routes/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES as dataGrid } from '@mui/x-data-grid';
import { esES as coreEsES } from '@mui/material/locale';
import { esES } from '@mui/x-date-pickers/locales';

const theme = createTheme(
  esES, // x-date-pickers translations
  dataGrid, // x-data-grid translations
  coreEsES, // core translations
  {
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'asignar' },
            style: {
              backgroundColor: '#F18F01', 
              color: '#ffffff', 
              fontWeight: 'bold', 
              textTransform: 'uppercase',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.3)',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#D78A17', 
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)'
              },
            },
          },
        ],
      },
    }
}
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />  
    </ThemeProvider>;
  </React.StrictMode>
);
