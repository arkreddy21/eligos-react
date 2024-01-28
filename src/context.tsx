import React, { useState, createContext, useContext, useEffect } from "react";
import { getUser } from "./utils";

const AppContext = createContext<{
  user: User;
}>({
  user: { id: "", name: "", email: "" },
});

const AppProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [user, setUser] = useState<User>({ id: "", name: "", email: "" });

  const loadUser = async () => {
    try {
      const data = await getUser();
      setUser(data);
    } catch {
      console.log("unable to fetch user data");
      //TODO: delete token from localstorage if api response is 401
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
