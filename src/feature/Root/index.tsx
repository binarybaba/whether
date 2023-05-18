import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar } from "src/feature/Navbar";
import { AppProvider } from "src/context";

export const Root = () => {
  const queryClient = new QueryClient();
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen h-screen">
          <Navbar />
          <div className="flex-grow overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    </AppProvider>
  );
};
