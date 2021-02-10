import { Routes, Route } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

import { ShellComponent } from './shell.component';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      //canActivate: [AuthGuard], //temporary commented so as to bypass auth
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true },
    };
  }
}
