import { Component, OnInit } from '@angular/core';
import { AsmService } from './asm.service';

@Component({
  selector: 'RequiredFiled',
  template: '<span class="error">*</span>'
})
export class RequiredFiledComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
  }
}
