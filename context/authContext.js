import {
  useContext,
  createContext,
  useState,
  useEffect,
  Children,
} from 'react';
import checkAuth from '@/app/actions/checkAuth';

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const { isAuthenticated, user } = await checkAuth();
      setIsAuthenticated(isAuthenticated);
      setCurrentUser(user);
    };
    checkAuthentication();
  }, []);

  return (
    <Authcontext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        checkAuth: async () => await checkAuth(),
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Authcontext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
