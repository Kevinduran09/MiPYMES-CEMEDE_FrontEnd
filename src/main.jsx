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
  esES,
  dataGrid,
  coreEsES,
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
