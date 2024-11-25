import { createContext, useContext, useEffect, useState } from 'react';
import FirstLoading from '../components/loading/FirstLoading';
const AppContext = createContext({ darkMode: true, toggleTheme: () => {} });
const AppContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [chats, setChats] = useState([]);

  const toggleTheme = () => {
    setDarkMode(prev => {
      localStorage.setItem('eden_estate_theme', JSON.stringify(!prev));
      return !prev;
    });
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const openChat = () => {
    setShowChat(true);
  };
  const closeChat = () => {
    setShowChat(false);
  };
  const updateUser = user => {
    localStorage.setItem('eden_estate_user', JSON.stringify(user));
    setUser(user);
  };
  const updateToken = token => {
    localStorage.setItem('eden_estate_token', JSON.stringify(token));
    setToken(token);
  };
  const login = (user, token) => {
    localStorage.setItem('eden_estate_user', JSON.stringify(user));
    localStorage.setItem('eden_estate_token', JSON.stringify(token));
    setUser(user);
    setToken(token);
  };
  const logout = () => {
    localStorage.setItem('eden_estate_user', JSON.stringify(null));
    localStorage.setItem('eden_estate_token', JSON.stringify(null));
    setUser(null);
    setToken(null);
  };

  const share = {
    darkMode,
    user,
    chats,
    setChats,
    rooms,
    token,
    showChat,
    setShowChat,
    openChat,
    closeChat,
    setRooms,
    conversation,
    setConversation,
    isDrawerOpen,
    updateUser,
    updateToken,
    toggleTheme,
    toggleDrawer,
    closeDrawer,
    login,
    logout,
  };

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('eden_estate_user'));
    const token = JSON.parse(localStorage.getItem('eden_estate_token'));
    const theme = JSON.parse(localStorage.getItem('eden_estate_theme'));
    setUser(user);
    setDarkMode(theme);
    setToken(token);
    setLoading(false);
  }, []);
  return (
    <AppContext.Provider value={{ ...share }}>
      {' '}
      {loading ? <FirstLoading /> : children}{' '}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
