import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); // If need start by 'dark'

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#2962ff', // General color
          },
          ...(mode === 'dark' ? {
            background: {
              default: '#263238', // Dark-gray in black theme
              paper: '#37474f', // More than dark-grey color to content 
            },
            text: {
              primary: '#ffffff', // White text in ligth theme
            },
          } : {
            background: {
              default: '#f5f5f5', // Ligth-gray in ligth theme 
              paper: '#ffffff', // Whigt color in light thrmr
            },
            text: {
              primary: '#000000', // black text in light theme 
            },
          }),
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;

