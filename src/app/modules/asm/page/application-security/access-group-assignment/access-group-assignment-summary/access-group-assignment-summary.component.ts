import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EncryptPipe } from '@app/modules/encrypt/pipes/encrypt.pipe';
import { Router } from '@angular/router';
import { AccessGroupModel } from '@app/data/schema/access-group';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-group-assignment-summary',
  templateUrl: './access-group-assignment-summary.component.html',
  styleUrls: ['./access-group-assignment-summary.component.scss'],
  providers: [EncryptPipe, ConfirmationService],
})
export class AccessGroupAssignmentSummaryComponent implements OnInit {
  productDialog: boolean;

  products: AccessGroupModel[];

  product: AccessGroupModel;
  
  selectedAccessGroup: AccessGroupModel[];

  submitted: boolean;

  constructor(
    private accessGroupService: AccessGroupService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private encrypt: EncryptPipe,
    private route: Router
  ) {}

  ngOnInit() {
    this.getAccessGroup();
  }

  /*
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  */
  openNew() {
    this.route.navigate(['/asm/access-group-assignment/0']);
  }

  deleteSelectedAccessGroup() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected accessgroup?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAccessGroup.forEach((accessGroup) => {   
          this.accessGroupService.deleteAccessGroup(accessGroup.accessGroupId).then((data) => (this.getAccessGroup()));
               });
       
        this.selectedAccessGroup = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'AccessGroup Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: AccessGroupModel) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: AccessGroupModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accessGroupService.deleteAccessGroup(product.accessGroupId).then((data) =>(this.getAccessGroup()));
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'AccessGroup Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.name) {
        this.products[this.findIndexById(this.product.name)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.name = this.createId();
        this.product.name = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].name === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  getAccessGroup()
  {
    this.accessGroupService
      .getAccessGroup()
      .then((data) => (this.products = data,console.log(data)));
  }
  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
