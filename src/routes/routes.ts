import type { LazyExoticComponent, ComponentType } from "react";
import { lazy } from "react";
import type { RouteProps } from "react-router-dom";

type IRoute = RouteProps & {
  component: LazyExoticComponent<ComponentType<any>>;
};
/**
 * @description All the routes for the application
 */
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
  {
    path: "fileupload",
    component: lazy(async () => await import("@/pages/UploadTemplate/FileUpload")),
  },
  {
    path: "filepreview",
    component: lazy(async () => await import("@/pages/UploadTemplate/FileView")),
  },
  {
    path: "filesuccesful",
    component: lazy(async () => await import("@/pages/UploadTemplate/FileSucessful")),
  },
];

export default ROUTES;
