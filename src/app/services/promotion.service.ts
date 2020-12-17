import { PROMOTIONS } from './../shared/promotions';
import { Promotion } from './../shared/promotion';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }


  getPromotions() : Promotion[] {
    return PROMOTIONS;
  }

  getDish(id: string):Promotion{
    return PROMOTIONS.filter((promo) => { promo.id === id })[0];
  }

  getFeaturedPromotion(): Promotion{
    return PROMOTIONS.filter((promo)=> promo.featured)[0];
  }

}