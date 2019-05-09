import { Route, Methods } from "./route";

export default class RouteMinified extends Route {
  constructor([route, method = Methods.GET, option = {}]: any) {
    let handler = null;
    let data = null;

    if (typeof option === "function") {
      handler = option;
    } else {
      data = option;
    }

    super({
      route,
      method,
      data,
      handler
    });
  }
}
