import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { ThemeProvider } from 'styled-components';
import { useAppContext } from './context/AppContextProvider';
import { theme } from './theme/them';
const App = () => {
  const { darkMode } = useAppContext();
  return (
    <ThemeProvider theme={darkMode ? theme.darkTheme : theme.lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
