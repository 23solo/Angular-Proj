import { baseURL } from './../shared/baseurl';
import { Injectable } from '@angular/core';
import { Leader } from './../shared/leader';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }
  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL+ 'leadership');
  }
  getFeaturedLeader() : Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leader=>leader[0]));
  }
  getLeader(id:string) : Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/' + id);
  }
}
