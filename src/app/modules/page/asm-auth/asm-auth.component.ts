import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asm-auth',
  templateUrl: './asm-auth.component.html',
  styleUrls: ['./asm-auth.component.scss'],
})
export class AsmAuthComponent implements OnInit {
  auth: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.auth = params.get('auth') || '';
    });
    if (this.auth == '') {
      this.router.navigate(['/signed-out']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
