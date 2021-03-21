import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer p-d-flex p-ai-center p-p-4 p-shadow-2">
          <strong>Copyright © 2021</strong>&nbsp;&nbsp;All rights reserved.
        </div>
    `
})
export class AppFooterComponent {
    constructor(public app: AppComponent) {}
}
