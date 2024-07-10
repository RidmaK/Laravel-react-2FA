import { createContext, useContext, useState, ReactNode } from "react";

interface StateContextType {
  user: any;
  token: any;
  setUser: (user: any) => void;
  setToken: (token: any) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}
const StateContext = createContext<StateContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<any>({
    name: "Ridma Kanchana Athukorala",
  });
  // const [token, _setToken] = useState<any>(123);
  const [token, _setToken] = useState<any>(
    localStorage.getItem("ACCESS_TOKEN")
  );

  const setToken = (token: any) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
