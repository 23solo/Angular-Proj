import { LEADERS } from './../shared/leaders';
import { Injectable } from '@angular/core';
import { Leader } from './../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Promise<Leader[]>{
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS),2000);
    });
  }
  getFeaturedLeader() : Promise<Leader>{
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((feat) => feat.featured)[0]),2000);
    }) ;
  }
  getLeader(id:string) : Promise<Leader>{
    return new Promise(resolve =>{
      setTimeout(() => resolve((LEADERS.filter((feat) => feat.id === id)[0])),2000)
    });
  }
}
