import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessGroupModel } from '@app/data/schema/access-group';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-group-summary',
  templateUrl: './access-group-summary.component.html',
  styleUrls: ['./access-group-summary.component.scss'],
})
export class AccessGroupSummaryComponent implements OnInit {
  productDialog: boolean;

  products: AccessGroupModel[];

  product: AccessGroupModel;

  selectedAccessGroup: AccessGroupModel[];

  submitted: boolean;

  constructor(
    private accessGroupService: AccessGroupService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAccessGroup();
  }

  openNew(): void {
    this.route.navigate(['/asm/access-group/0']);
  }

  deleteSelectedAccessGroup(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected accessgroup?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAccessGroup.forEach((accessGroup) => {
          this.accessGroupService
            .deleteAccessGroup(accessGroup.accessGroupId)
            .then((data) => this.getAccessGroup());
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

  editProduct(product: AccessGroupModel): void {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: AccessGroupModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accessGroupService
          .deleteAccessGroup(product.accessGroupId)
          .then((data) => this.getAccessGroup());
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

  hideDialog(): void {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(): void {
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
  getAccessGroup(): void {
    this.accessGroupService
      .getAccessGroup()
      .then((data) => ((this.products = data), console.log(data)));
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
