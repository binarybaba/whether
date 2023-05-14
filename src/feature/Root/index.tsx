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
        <Navbar />
        <Outlet />
      </QueryClientProvider>
    </AppProvider>
  );
};
