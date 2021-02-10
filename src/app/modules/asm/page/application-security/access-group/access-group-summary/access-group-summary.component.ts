import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EncryptPipe } from '@app/modules/encrypt/pipes/encrypt.pipe';
import { Router } from '@angular/router';
import { Product } from '@app/data/schema/product';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-group-summary',
  templateUrl: './access-group-summary.component.html',
  styleUrls: ['./access-group-summary.component.scss'],
  providers: [EncryptPipe, ConfirmationService],
})
export class AccessGroupSummaryComponent implements OnInit {
  productDialog: boolean;

  products: Product[];

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;

  constructor(
    private accessGroupService: AccessGroupService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private encrypt: EncryptPipe,
    private route: Router
  ) {}

  ngOnInit() {
    this.accessGroupService
      .getProducts()
      .then((data) => (this.products = data));
  }

  /*
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  */
  openNew() {
    this.route.navigate(['/asm/access-group/0']);
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
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
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
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
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
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
