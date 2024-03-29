import { Leader } from './../shared/leader';
import { LeaderService } from './../services/leader.service';
import { Component, OnInit, Inject } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animations';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {

  leaders : Leader[];
  ledErrMsg: string;
  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }
  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leaders)=> this.leaders =leaders, err => this.ledErrMsg = <any>err);
    console.log();
  }


}
