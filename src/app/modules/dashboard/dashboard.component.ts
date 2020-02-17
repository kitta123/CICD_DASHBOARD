import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private _apiservice: AppService, private _router: Router, private spinnerService: Ng4LoadingSpinnerService) { }
  ngOnInit() {
    this.getBuildNumber()
  }
  data: any;
  getBuildNumber() {
    this.spinnerService.show();
    this._apiservice.private()
      .subscribe(response => {
        this.data = response;
        this.spinnerService.hide();
        if(this.data.length == []){
          alert('Build Number Not Found.Please create new Build')
        }
        else{
         this._router.navigate(['/private/image/' + this.data[0].build_number])
        }
      });
  }

}
