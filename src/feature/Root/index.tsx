import { Outlet } from "react-router-dom";
import { Navbar } from "src/feature/Navbar";
import { AppProvider } from "src/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Root = () => {
  const queryClient = new QueryClient();
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
      </QueryClientProvider>
    </AppProvider>
  );
};
