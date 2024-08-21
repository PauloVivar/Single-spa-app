import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';


//import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

//test
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

// const lifecycles = singleSpaAngular({
//   bootstrapFunction: singleSpaProps => {
//     singleSpaPropsSubject.next(singleSpaProps);
//     return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
//   },
//   template: '<app-root />',
//   Router,
//   NavigationStart,
//   NgZone,
// });

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    return bootstrapApplication(AppComponent, appConfig);
  },
  template: '<app-root />',
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
