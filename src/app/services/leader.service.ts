import { LEADERS } from './../shared/leaders';
import { Injectable } from '@angular/core';
import { Leader } from './../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Promise<Leader[]>{
    return Promise.resolve(LEADERS);
  }
  getFeaturedLeader() : Promise<Leader>{
    return Promise.resolve(LEADERS.filter((feat)=> feat.featured)[0]);
  }
  getLeader(id:string) : Promise<Leader>{
    return Promise.resolve(LEADERS.filter((feat) => feat.id === id)[0]);
  }
}
