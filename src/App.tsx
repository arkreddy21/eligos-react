import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQuery";
import { AppProvider } from "./context";

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
