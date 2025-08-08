import { bootstrapApplication } from "@angular/platform-browser";
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from "@angular/router";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";

/**
 * Bootstrap the Angular application
 * Sets up the root component and routing for the Transaction Cart feature
 */
bootstrapApplication(AppComponent, {
  providers: [
    // Router configuration with preloading for better performance
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
}).catch((err) => {
  // Only log errors in development for cleaner production console
  if (typeof ngDevMode !== "undefined" && ngDevMode) {
    console.error("Error starting app:", err);
  }
  // Still throw to maintain error handling
  throw err;
});
