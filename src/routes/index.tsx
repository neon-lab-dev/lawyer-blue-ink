import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "./routes";

import type { JSX } from "react";
import AppLayout from "@/components/AppLayout";
import AppLoading from "@/components/AppLoading";

const RoutesContainer = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        {ROUTES.map(({ component: Component, ...props }, index) => {
          return (
            <Route
              key={index}
              element={
                <AppLayout>
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
