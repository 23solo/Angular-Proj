import { catchError } from 'rxjs/operators';
import { Leader } from './../shared/leader';
import { LeaderService } from './../services/leader.service';
import { PromotionService } from './../services/promotion.service';
import { Promotion } from './../shared/promotion';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, OnInit, Inject } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
      '[@flyInOut]': 'true',
      'style': 'display: block;'
      },
      animations: [
        flyInOut(),
        expand()
      ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg : string;
  promoErrMsg : string;
  ledErrMsg: string;
  constructor(
    private dishService:DishService,
    private promotionService:PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish, err => this.dishErrMsg = <any>err);
    this.promotionService.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion, err => this.promoErrMsg = <any>err );
    this.leaderService.getFeaturedLeader().subscribe((leader)=>this.leader=leader, err=>this.ledErrMsg = <any>err);
  }

}
