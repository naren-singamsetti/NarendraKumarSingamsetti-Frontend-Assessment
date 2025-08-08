import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { APP_TITLES, COMPONENT_SELECTORS } from "./core/constants";

/**
 * Main App Component
 * Root component that orchestrates the transaction cart application
 */
@Component({
  selector: COMPONENT_SELECTORS.APP_ROOT,
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
/**
 * Main App Component class
 * Root component that provides layout structure
 */
export class AppComponent {
  title = APP_TITLES.MAIN;
}
