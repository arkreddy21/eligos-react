import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
