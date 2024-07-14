import { createContext, useContext, useState, ReactNode } from "react";

interface StateContextType {
    user: any;
    token: any;
    load: any;
    otp: any;
    notification: any;
    setUser: (user: any) => void;
    setToken: (token: any) => void;
    setNotification: (token: any) => void;
    setOTP: (otp: any) => void;
}

interface ContextProviderProps {
    children: ReactNode;
}
const StateContext = createContext<StateContextType>({
    user: null,
    token: null,
    load: null,
    notification: null,
    otp: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setOTP: () => {},
});

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<any>({
        name: "",
    });
    // const [token, _setToken] = useState<any>(123);
    const [token, _setToken] = useState<any>(
        localStorage.getItem("ACCESS_TOKEN")
    );
    const [notification, _setNotification] = useState("");
    const [otp, _setOTP] = useState(false);
    const [load, _setLoad] = useState<boolean>(false);

    const setToken = (token: any) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setOTP = (otp: any) => {
        _setOTP(otp);
    };

    const setNotification = (message: any) => {
        _setNotification(message);
        _setLoad(!load);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                load,
                setUser,
                setToken,
                notification,
                otp,
                setNotification,
                setOTP,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
