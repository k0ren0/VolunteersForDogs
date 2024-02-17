import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); // Можно начать с 'dark', если нужна темная тема по умолчанию

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
            main: '#2962ff', // Измените основной цвет на ваш выбор
          },
          ...(mode === 'dark' ? {
            background: {
              default: '#263238', // Темно-серый фон в темной теме
              paper: '#37474f', // Более темно-серый цвет для контента
            },
            text: {
              primary: '#ffffff', // Белый текст в темной теме
            },
          } : {
            background: {
              default: '#f5f5f5', // Светло-серый фон в светлой теме
              paper: '#ffffff', // Белый фон для контента
            },
            text: {
              primary: '#000000', // Черный текст в светлой теме
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

