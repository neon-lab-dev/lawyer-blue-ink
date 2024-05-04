import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoutesContainer from "./routes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";

const queryClient = new QueryClient();
const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RoutesContainer />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
};
export default App;
