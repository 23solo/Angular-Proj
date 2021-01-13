import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { catchError } from 'rxjs/operators';
import { baseURL } from './../shared/baseurl';
import { Observable } from 'rxjs';
import { Feedback } from './../shared/feedback';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http : HttpClient, private processHTTPMsgService: ProcessHTTPMsgService ) { }



  postFeedback(fb: Feedback): Observable<Feedback> {
    //console.log(fb);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', fb, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }



}
