import * as express from "express";
import { requireFile } from "../utils/file";
import * as portfinder from "portfinder";
import { log } from "../utils";
import { Route } from "./route";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import RouteMinified from "./routeMinified";

export default class Snide {
  private application: express.Application;
  private files: Array<any> = [];

  constructor() {
    this.application = express();
    this.configExpress();
  }

  private configExpress() {
    this.application.use(cors());
    this.application.use(bodyParser.json());
  }

  read(path): Snide {
    this.files = [...this.files, ...requireFile(path)];
    return this;
  }

  compile(): Snide {
    this.files
      .map((item: any) => {
        return Array.isArray(item)
          ? new RouteMinified(item)
          : new Route(item);
      })
      .forEach((item: Route) => this.setRoute(item));
    return this;
  }

  setRoute(route: Route) {
    log(`[${route.method.toUpperCase()}] ${route.route}`);
    this.application[route.method](route.route, (...args) => {
      setTimeout(() => route.handler(...args), route.resolveTime());
    });
  }

  async boostrap({
    getPort = false,
    port = 3000
  }: { getPort?: boolean; port?: number } = {}) {
    if (getPort) port = await portfinder.getPortPromise();

    return this.application.listen(port, () => {
      log(`\n🚀  Snide ready on ${port}`);
    });
  }
}
