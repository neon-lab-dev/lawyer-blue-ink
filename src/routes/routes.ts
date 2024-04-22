import type { LazyExoticComponent, ComponentType } from "react";
import { lazy } from "react";
import type { RouteProps } from "react-router-dom";

type IRoute = RouteProps & {
  component: LazyExoticComponent<ComponentType<any>>;
};

const ROUTES: IRoute[] = [
  {
    path: "/",
    component: lazy(async () => await import("@/pages/UploadTemplate")),
  },
  {
    path: "/send-email",
    component: lazy(async () => await import("@/pages/SendEmail")),
  },
  {
    path: "/view-templates",
    component: lazy(async () => await import("@/pages/ViewTemplates")),
  },
  {
    path: "/login",
    component: lazy(async () => await import("@/pages/Login")),
  },
  {
    path: "*",
    component: lazy(async () => await import("@/pages/Error/404")),
  },
];

export default ROUTES;
