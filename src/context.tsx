import React, { useState, createContext, useContext, useEffect } from "react";
import { getUser } from "./utils";
import { useLocalStorage } from "@mantine/hooks";
import { HTTPError } from "ky";

const AppContext = createContext<{
  user: User | undefined;
  token: string;
  setToken: (val: string | ((prevState: string) => string)) => void;
}>(undefined!);

const AppProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken, removeToken] = useLocalStorage({
    key: "token",
    defaultValue: "",
    getInitialValueInEffect: false,
  });

  useEffect(() => {
    if (!token) {
      return;
    }
    let ignore = false;
    const loadUser = async () => {
      try {
        const data = await getUser();
        ignore || setUser(data);
      } catch (err) {
        console.log("unable to fetch user data");
        if (err instanceof HTTPError && err.response.status === 401) {
          removeToken();
        }
      }
    };
    loadUser();
    return () => {
      ignore = true;
    };
  }, [token, removeToken]);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppProvider, useGlobalContext };
