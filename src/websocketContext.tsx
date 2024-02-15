import React, { createContext, useContext, useEffect, useRef } from "react";
import { useGlobalContext } from "./context";
import { useQueryClient } from "@tanstack/react-query";

const WsContext = createContext<{ websocket: WebSocket | undefined }>(
  undefined!
);

const WsProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useGlobalContext();
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | undefined>();

  useEffect(() => {
    if (user) {
      wsRef.current = new WebSocket(
        `${import.meta.env.VITE_WS_URL}?token=${localStorage.getItem("token")}`
      );
      wsRef.current.onopen = () => {
        console.log("ws connected");
      };
      wsRef.current.onmessage = (event) => {
        console.log(event);
        const data = JSON.parse(event.data) as Message;
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ["messages", data.spaceid] });
      };
      return () => {
        wsRef.current?.close();
      };
    }
  }, [user, queryClient]);
  return (
    <WsContext.Provider value={{ websocket: wsRef.current }}>
      {children}
    </WsContext.Provider>
  );
};

const useWsContext = () => {
  return useContext(WsContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { WsProvider, useWsContext };
