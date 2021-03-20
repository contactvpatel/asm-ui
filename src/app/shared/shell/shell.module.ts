import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ShellComponent]
})
export class ShellModule {}
