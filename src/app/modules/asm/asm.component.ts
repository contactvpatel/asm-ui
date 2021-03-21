import { Component, OnInit } from '@angular/core';
import { AsmService } from './asm.service';

@Component({
  selector: 'app-asm',
  templateUrl: './asm.component.html',
  styleUrls: ['./asm.component.scss']
})
export class AsmComponent implements OnInit {
  pageLoader: boolean;
  constructor(private asmService: AsmService) {
    this.pageLoader = this.asmService.pageLoader;
    asmService.pageLoaderChange.subscribe((value) => {
      this.pageLoader = value;
    });
  }

  ngOnInit(): void {
  }
}
