import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessGroupAPI } from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';
import { AccessGroupModel, Department } from '../schema/access-group';

import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGroupService {
  [x: string]: any;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  url = environment.serverUrl;
  productNames: string[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
    'Grey T-Shirt',
    'Headphones',
    'Light Green T-Shirt',
    'Lime Band',
    'Mini Speakers',
    'Painted Phone Case',
    'Pink Band',
    'Pink Purse',
    'Purple Band',
    'Purple Gemstone Necklace',
    'Purple T-Shirt',
    'Shoes',
    'Sneakers',
    'Teal T-Shirt',
    'Yellow Earbuds',
    'Yoga Mat',
    'Yoga Set'
  ];

  constructor(private http: HttpClient, private commonService: CommonService) {}
  getAccessGroup() {
    return this.http
      .get<any>(this.url + AccessGroupAPI.GetAllAccessGroup)
      .toPromise()
      .then((res) => <AccessGroupModel[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getDepartment() {
    return this.http
      .get<any>(this.url + 'departments')
      .toPromise()
      .then((res) => <Department[]>res.data)
      .then((data) => {
        return data;
      });
  }
  deleteAccessGroup(accessGroupId: number) {
    return this.commonService
      .delete('access-groups/' + accessGroupId + '/0')
      .toPromise()
      .then((data) => {
        return data;
      });
  }
  createAccessGroup(accessGroup: any) {
    return this.commonService
      .post('access-groups', accessGroup)
      .toPromise()
      .then((data) => {
        return data;
      });
  }
  getProductsSmall() {
    return this.http
      .get<any>('assets/products-small.json')
      .toPromise()
      .then((res) => <AccessGroupModel[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProducts() {
    return this.http
      .get<any>('assets/products.json')
      .toPromise()
      .then((res) => <AccessGroupModel[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/products-orders-small.json')
      .toPromise()
      .then((res) => <AccessGroupModel[]>res.data)
      .then((data) => {
        return data;
      });
  }

  // generatePrduct(): Module {
  //   const product: Module = {
  //     id: this.generateId(),
  //     name: this.generateName(),
  //     description: 'Product Description',
  //     price: this.generatePrice(),
  //     quantity: this.generateQuantity(),
  //     category: 'Product Category',
  //     inventoryStatus: this.generateStatus(),
  //     rating: this.generateRating(),
  //   };

  //   product.image =
  //     product.name.toLocaleLowerCase().split(/[ ,]+/).join('-') + '.jpg';
  //   return product;
  // }

  generateId() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating() {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }
}
