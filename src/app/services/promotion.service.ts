import { PROMOTIONS } from './../shared/promotions';
import { Promotion } from './../shared/promotion';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }


  getPromotions() : Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }

  getDish(id: string):Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promo) => { promo.id === id })[0]);
  }

  getFeaturedPromotion(): Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promo)=> promo.featured)[0]);
  }

}