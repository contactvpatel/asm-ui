import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EncryptPipe } from '@app/modules/encrypt/pipes/encrypt.pipe';
import { Router } from '@angular/router';
import { AccessGroupModel } from '@app/data/schema/access-group';

import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-group-assignment-summary',
  templateUrl: './access-group-assignment-summary.component.html',
  styleUrls: ['./access-group-assignment-summary.component.scss'],
  providers: [EncryptPipe, ConfirmationService]
})
export class AccessGroupAssignmentSummaryComponent implements OnInit {
  productDialog: boolean;

  accessGroupAssignment: AccessGroupModel[];

  product: AccessGroupModel;

  selectedAccessGroup: AccessGroupModel[];

  submitted: boolean;

  constructor(
    private accessGroupAssignmentService: AccessGroupAssignmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private encrypt: EncryptPipe,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAccessGroupAssignment();
  }

  /*
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  */
  openNew(): void {
    this.route.navigate(['/asm/access-group-assignment/0']);
  }

  deleteSelectedAccessGroup(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected accessgroup?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAccessGroup.forEach((accessGroup) => {
          // this.accessGroupService.deleteAccessGroup(accessGroup.accessGroupId).then((data) => (this.getAccessGroup()));
        });

        this.selectedAccessGroup = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'AccessGroup Deleted',
          life: 3000
        });
      }
    });
  }

  editProduct(product: AccessGroupModel): void {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(accessGroupAssignment: AccessGroupModel): void {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + accessGroupAssignment.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.sr.deleteAccessGroup(product.accessGroupId).then((data) =>(this.getAccessGroup()));
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'AccessGroup Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog(): void {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(): void {
    // this.submitted = true;
    // if (this.product.name.trim()) {
    //   if (this.product.name) {
    //     this.products[this.findIndexById(this.product.name)] = this.product;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Product Updated',
    //       life: 3000,
    //     });
    //   } else {
    //     this.product.name = this.createId();
    //     this.product.name = 'product-placeholder.svg';
    //     this.products.push(this.product);
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Product Created',
    //       life: 3000,
    //     });
    //   }
    //   this.products = [...this.products];
    //   this.productDialog = false;
    //   this.product = {};
    // }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.accessGroupAssignment.length; i++) {
      if (this.accessGroupAssignment[i].name === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  getAccessGroupAssignment(): void {
    this.accessGroupAssignmentService
      .getAccessGroupAssignment()
      .then((data) => (this.accessGroupAssignment = data));
  }
  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
