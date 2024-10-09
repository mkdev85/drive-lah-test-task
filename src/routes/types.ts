import { ReactNode } from "react";

export interface RouteConfig {
  path: string;
  name: string;
}

export interface ComponentRouteConfig extends RouteConfig {
  component: ReactNode
}