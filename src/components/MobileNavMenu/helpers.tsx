import { PublicRoutes } from "../../routes";
import { NavMenuButton } from "./MobileNavMenu";

export const getActiveNavBtn = (route: string) => {
  switch (route) {
    case PublicRoutes.ALL_REPORTS.static:
      return NavMenuButton.AllObjects;

    case PublicRoutes.ALL_AGENTS.static:
      return NavMenuButton.AllAgents;

    case PublicRoutes.MY_REQUESTS.static:
      return NavMenuButton.MyRequests;

    default:
      return null;
  }
};
