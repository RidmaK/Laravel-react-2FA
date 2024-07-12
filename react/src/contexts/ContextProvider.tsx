import { createContext, useContext, useState, ReactNode } from "react";

interface StateContextType {
  user: any;
  token: any;
  load: any;
  notification: any;
  setUser: (user: any) => void;
  setToken: (token: any) => void;
  setNotification: (token: any) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}
const StateContext = createContext<StateContextType>({
  user: null,
  token: null,
  load: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<any>({
    name: "",
  });
  // const [token, _setToken] = useState<any>(123);
  const [token, _setToken] = useState<any>(
    localStorage.getItem("ACCESS_TOKEN")
  );
  const [notification, _setNotification] = useState('');
  const [load, _setLoad] = useState<boolean>(false);

  const setToken = (token: any) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message: any) => {
    _setNotification(message);
    _setLoad(!load);

    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  return (
    <StateContext.Provider value={{ user, token, load, setUser, setToken,
      notification,
      setNotification }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
