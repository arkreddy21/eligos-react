import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen'
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQuery";
import { AppProvider } from "./context";

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <AppProvider>
        <QueryClientProvider client={queryClient} >
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppProvider>
    </MantineProvider>
  );
}

export default App;
