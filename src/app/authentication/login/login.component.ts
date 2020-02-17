import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SigninService } from './signin.service';
import { AppService } from './../../services/app.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SigninService]
})
export class LoginComponent implements OnInit {
  // public form: FormGroup;
  access_token: string;
  constructor(
    private _signinService: SigninService,
    private router: Router,
    private _toastr: ToastrService,
    private apiservice: AppService
  ) { }
  data: any;
  ngOnInit() {

    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
      if (showPass == 0) {
        $(this).next('input').attr('type', 'text');
        $(this).find('i').removeClass(' fa-eye');
        $(this).find('i').addClass(' fa-eye-slash');
        showPass = 1;
      }
      else {
        $(this).next('input').attr('type', 'password');
        $(this).find('i').addClass(' fa-eye');
        $(this).find('i').removeClass(' fa-eye-slash');
        showPass = 0;
      }
    });
  }
  mail: any;
  psd: any;

  userNamePassword(arg1, arg2) {

    // this.mail = arg1;
    // this.psd = arg2;
    // console.log(11)
    // this._signinService.userNamePassword(arg1, arg2).subscribe(
    //   response => {
    //     sessionStorage.setItem('Username', response[0].name);

    //   }
    // )
  }

  userName: string = '';
  passwordValue: string = '';
  loginSuccess: any;

  submit = function (f) {
    if (f.value.username == '') {
      this._toastr.warning('Enter UserName', 'Warning!');
      return false;
    }
    else if (f.value.password == '') {
      // swal('error','Enter Password','error');
      this._toastr.warning('Enter Password', 'Warning!');
    }
    else {
      this._signinService.userNamePassword(f.value.username, f.value.password).subscribe(
        response => {
          sessionStorage.setItem('Username', f.value.username);
          sessionStorage.setItem('Password',f.value.password);
      //    sessionStorage.setItem('Password', response[1].password)
          this.router.navigate(['/dashboard']);
        }
      )
    }
  }
}