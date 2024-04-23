import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "./routes";

import type { JSX } from "react";
import AppLayout from "@/components/ui/AppLayout";
import AppLoading from "@/components/ui/AppLoading";

const RoutesContainer = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        {ROUTES.map(({ component: Component, ...props }, index) => {
          return (
            <Route
              key={index}
              element={
                // Wrap the component in the AppLayout ie Header, Footer, Sidebar etc
                <AppLayout>
                  {/* // Suspense for lazy loading components */}
                  <Suspense fallback={<AppLoading />}>
                    <Component />
                  </Suspense>
                </AppLayout>
              }
              {...props}
            />
          );
        })}
      </Routes>
    </Router>
  );
};
export default RoutesContainer;
