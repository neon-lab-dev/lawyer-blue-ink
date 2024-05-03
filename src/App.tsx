import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoutesContainer from "./routes";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutesContainer />
      <Toaster />
    </QueryClientProvider>
  );
};
export default App;
