import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {  Module,   ModuleType } from '../schema/module';
import { ModuleAPI  } from '../../shared/constants/api.constant';
import {CommonService}from '../services/common.service'

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  url = environment.serverUrl;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

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
    'Yoga Set',
  ];

  constructor(private http: HttpClient,private commonService:CommonService) {}

  getProductsSmall() {
    return this.http
      .get<any>('assets/products-small.json')
      .toPromise()
      .then((res) => <Module[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getModules() {
    return this.http
      .get<any>(this.url+ ModuleAPI.GetAllModule)
      .toPromise()
      .then((res) => <Module[]>res.data)
      .then((data) => {
        return data;
      });
  }
  getModulesByApplicationId(applicationId:any) {
    return this.http
      .get<any>(this.url+ ModuleAPI.GetModuleByApplication+applicationId)
      .toPromise()
      .then((res) => <Module[]>res.data)
      .then((data) => {
        return data;
      });
  }
  getModuleType() {
    return this.http
      .get<any>('https://localhost:44388/api/v1.0/module-types')
      .toPromise()
      .then((res) => <ModuleType[]>res.data)
      .then((data) => {
        return data;
      });
  }
  getModuleById(module:any)
  {
    return this.http
    .get<any>(this.url+ ModuleAPI.GetModuleById+module)
    .toPromise()
    .then((res) => <Module>res.data)
    .then((data) => {
      return data;
    });
  }
  createModule(module:any) {
    console.log(module)
    return this.commonService
      .post('modules',module)
      .toPromise()      
      .then((data) => {
        return data;
      });
  }
  updateModule(module:any)
  {
    return this.http
    .put<any>(this.url+ ModuleAPI.UpdateModule,module)
    .toPromise()
    .then((res) => <Module>res.data)
    .then((data) => {
      return data;
    });
  }
  deleteModule(module:any) {
    console.log(module)
    return this.commonService
      .delete('modules/'+module+"/"+0)
      .toPromise()      
      .then((data) => {
        return data;
      });
  }
  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/products-orders-small.json')
      .toPromise()
      .then((res) => <Module[]>res.data)
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
