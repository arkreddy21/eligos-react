import React, { createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import { useQueryClient } from "@tanstack/react-query";

const WsContext = createContext<{ websocket: WebSocket | undefined }>(
  undefined!
);

const WsProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, token } = useGlobalContext();
  const queryClient = useQueryClient();
  const [websocket, setWebsocket] = useState<WebSocket | undefined>();

  useEffect(() => {
    if (!user) {
      return;
    }
    const ws = new WebSocket(
      `${import.meta.env.VITE_WS_URL}?token=${token}`
    );
    ws.onopen = () => {
      console.log("ws connected");
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as WsMessage;
      if(data.proto === "message") {
        // queryClient.invalidateQueries({ queryKey: ["messages", data.spaceid] });
        queryClient.setQueryData(["messages", data.spaceid], (oldData: any)=>{
          return [...oldData, data.payload];
        })
      }
      
    };
    ws.onclose = () => {
      console.log("ws closed");
    }
    setWebsocket(ws);
    return () => {
      ws.close();
      setWebsocket(undefined);
    };
  }, [user, token, queryClient]);

  return (
    <WsContext.Provider value={{ websocket: websocket }}>
      {children}
    </WsContext.Provider>
  );
};

const useWsContext = () => {
  return useContext(WsContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { WsProvider, useWsContext };
