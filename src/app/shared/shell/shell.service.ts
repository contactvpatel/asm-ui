import { Route, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ShellComponent } from '@app/shared/shell/shell.component';
import { environment } from '@env/environment';

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
      canActivate: environment.ssoEnabled ? [AuthGuard] : [],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
}
