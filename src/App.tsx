import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { MantineProvider, TextInput, createTheme } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQuery";
import { AppProvider, useGlobalContext } from "./context";
import { WsProvider } from "./websocketContext";

const router = createRouter({ routeTree, context: { user: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function RouterWithContext() {
  const { user } = useGlobalContext();
  return <RouterProvider router={router} context={{ user }} />;
}

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        radius: "md",
      }
    })
  }
})

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <WsProvider>
            <RouterWithContext />
          </WsProvider>
        </QueryClientProvider>
      </AppProvider>
    </MantineProvider>
  );
}

export default App;
