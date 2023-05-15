import { Outlet, useNavigation } from "react-router-dom";
import { Navbar } from "src/feature/Navbar";
import { AppProvider } from "src/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Root = () => {
  const queryClient = new QueryClient();
  const navigation = useNavigation();
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        {navigation.state === "loading" && <div>LOADING</div>}
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
