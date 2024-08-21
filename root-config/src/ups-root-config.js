import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

//applications.forEach(registerApplication);

//test
registerApplication({
  name: "@ups/react-tasks",
  app: () => System.import("@ups/react-tasks"),
  activeWhen: ["/tasks"]
});

registerApplication({
  name: "@ups/angular-login",
  app: () => System.import("@ups/angular-login"),
  activeWhen: ["/login"]
});

layoutEngine.activate();
start();
