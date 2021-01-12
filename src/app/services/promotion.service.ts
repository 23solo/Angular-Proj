import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from './../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { Promotion } from './../shared/promotion';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


  getPromotions() : Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getDish(id: string):Observable<Promotion>{
    return this.http.get<Promotion>(baseURL +'promotions'+ id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(promo=>promo[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

}