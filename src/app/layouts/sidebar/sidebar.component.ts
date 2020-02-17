import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  value: string = "private";

  loginname: string;
  selectedIndex1: number = null;
  selectedIndex2: number = null;
  constructor(private router: Router, private apiservice: AppService, private spinnerService: Ng4LoadingSpinnerService) {
    this.loginname = sessionStorage.getItem('Username')
  }
  data1 = [];
  data: any;

  drpValue = 'private';
  drpValue1 = 'night';
  ngOnInit() {
    this.build1();
    this.build2();

    this.apiservice.cast.subscribe(user=>
      this.loadDatafromNavBar()
       );
  }


  loadDatafromNavBar() {
   
    if (this.value == 'private') {
     // alert("Toggled");
      this.build1();
    }
    else if (this.value == 'night') {
      this.build2();
    }
  }

  getValue(arg) {
    if (arg.target.value == "night") {
      this.value = "night";
      this.router.navigate(['night']);
    }
    else if (arg.target.value == "private") {
      this.value = "private";
      this.router.navigate(['private']);
    }
  }

  build1() {
    this.spinnerService.show();
    this.apiservice.private()
      .subscribe(response => {
        this.data = response;
        this.spinnerService.hide();
      });
  }

  build2() {
    this.apiservice.night()
      .subscribe(response => {
        this.data1 = response;
        this.spinnerService.hide();
      });
  }

  CallHome(val, index) {
    this.selectedIndex2 = index
    this.router.navigate(['/night/image/' + val]);
  }

  CallHome1(val, index) {
    this.selectedIndex1 = index
    this.router.navigate(['/private/image/' + val])
  }
}
