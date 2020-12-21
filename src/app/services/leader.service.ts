import { LEADERS } from './../shared/leaders';
import { Injectable } from '@angular/core';
import { Leader } from './../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Leader[]{
    return LEADERS;
  }
  getFeaturedLeader() : Leader{
    return LEADERS.filter((feat)=> feat.featured)[0];
  }
  getLeader(id:string) : Leader{
    return LEADERS.filter((feat) => feat.id === id)[0];
  }
}
