import { AppService } from './../../services/app.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { JobconfigService } from './jobconfig.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-jobconfig',
  templateUrl: './jobconfig.component.html',
  styleUrls: ['./jobconfig.component.scss']
})
export class JobconfigComponent implements OnInit {

  loginname: string;
  build_type: any;
  radioTitle: string;
  radioItems: Array<string>;
  model = { option: 'Build + Upgrade + Run Tests' };
  toggleImgPath: boolean = false;
  testcaseObj: any;
  @Output() myEvent = new EventEmitter();

  constructor(private http: HttpClient, private appService: AppService, private router: Router,
    private fb: FormBuilder, private _jobconfigService: JobconfigService, private _toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService, private _router: Router) {
    this.loginname = sessionStorage.getItem('Username');
    this.radioTitle = 'Radio Button in Angular';
    this.radioItems = ['Build + Upgrade + Run Tests', 'Upgrade + Run Tests'];
  }

  isCollapsed = true;
  settingsForm: FormGroup;
  buildForm: FormGroup;
  testUI: FormGroup;
  data: any;

  getTestCases() {
    this.testcaseObj = [
      {
        "name": "Device",
        "value": "d"
      },
      {
        "name": "Reboot",
        "value": "reboot"
      },
      {
        "name": "SPV",
        "value": "spv"
      },
    ]
  }


  ngOnInit() {
    this.loadAPI()
    this.getTestCases()
    this.settingsFormObj.username = this.loginname;
    this.settingsForm = this.fb.group({
      username: '',
      build_type: null
    });

    this.appService.private()
      .subscribe(response => {
        this.data = response;
        this.spinnerService.hide();
        if (this.data.length == []) {
          this.radioItems = ['Build + Upgrade + Run Tests'];
          this.buildFormObj.Build = true;
          this.buildFormObj.Upgrade = true;
          this.buildFormObj.Run_tests = true;
          this.toggleImgPath = false;
        }
        else {
          this.radioItems = ['Build + Upgrade + Run Tests', 'Upgrade + Run Tests'];
          this.buildFormObj.Build = true;
          this.buildFormObj.Upgrade = true;
          this.buildFormObj.Run_tests = true;
        }
      });

    this.buildForm = this.fb.group({
      Views: null,
      // Build_types: this.build_type,
      Build_types: 'CU',
      TestSuites: null,
      Build: false,
      Upgrade: false,
      Run_tests: false,
      Build_image_path: null
    });

    this.testUI = this.fb.group({
      testsuite: [],
      testcases: this.fb.array([])
    })
  }


  addNewAddressGroup() {
    const add = this.testUI.get('testcases') as FormArray;
    add.push(this.fb.group({
      testcase: [],
      commands: [],
      parameter: [],
      results: []
    }))
  }

  deleteAddressGroup(index: number) {
    const add = this.testUI.get('testcases') as FormArray;
    add.removeAt(index)
  }

  submitPostSettings() {
    this._jobconfigService.postSettings(this.settingsFormObj).subscribe(
      data => {
        // alert('Data Saved Succesfully');
        this._toastr.success('Settings saved succesfully', 'Success!');
        // this.getBuild(this.loginname);
      }
    )
  }

  postTestUI() {
    this.spinnerService.show();
    this._jobconfigService.postTestUI(this.testUI.value).subscribe(
      response => {
        if (response) {
          this._toastr.success('Data saved succesfully', 'Success!');
          this.spinnerService.hide();
        }
      }
    )
  }

  parameter_one: any = "";
  parameter_two: any = "";
  parameter_three: any = ""

  onChangeDrpTestCase(val, index) {
    if (val[index] == '0:d') {
      this.parameter_one[index] = "Ip Address";
      this.parameter_two[index] = "UserName"
      this.parameter_three[index] = "Password"
    } else {
      this.parameter_one = "parameter 1";
      this.parameter_two = "parameter 2"
      this.parameter_three = "parameter 3"
    }

  }

  OnRadioBtnChnge(arg) {
    this.buildFormObj.Build_image_path = null;
    if (arg == "Build + Upgrade + Run Tests") {
      this.buildFormObj.Build = true;
      this.buildFormObj.Upgrade = true;
      this.buildFormObj.Run_tests = true;
      this.toggleImgPath = false;
    }
    else if (arg == "Upgrade + Run Tests") {
      this.buildFormObj.Build = false;
      this.buildFormObj.Upgrade = true;
      this.buildFormObj.Run_tests = true;
      this.toggleImgPath = true;
    }
  }


  loadAPI() {
  //  this.buildForm.reset();
    this.getViews();
    this.getTestSuites();
    this.getImagePaths()
  }

  testSuites: [];
  getTestSuites() {
    this._jobconfigService.getTestSuites().subscribe(
      response => {
        this.testSuites = response;
        console.log(this.testSuites)
      }
    )
  }

  views: any = [];
  getViews() {

    this._jobconfigService.getViews().subscribe(
      data => {
        this.views = data;
        console.log(this.views)
      });
  }

  imagepath: any;
  getImagePaths() {
    this._jobconfigService.getImagePaths().subscribe(
      data => {
        this.imagepath = data;
      })
  }

  submitPostBuild() {
    localStorage.setItem('testCase', this.buildFormObj.TestSuites)
    this.spinnerService.show();
    var build_no;
    this._jobconfigService.postBuild(this.buildFormObj).subscribe(
      data => {
        build_no = data;
        this.spinnerService.hide();
        this._toastr.success('#' + build_no.buildno + ' Build triggered succesfully', 'Success!');
        this._router.navigate(['/private/image/' + build_no.buildno])
        localStorage.setItem("build_number", build_no.buildno);
        this.myEvent.emit(null)
        this.appService.editUser(null);
        this.buildForm.reset();
      }
    )
  }

  settingsFormObj: any = {
    username: null,
    build_type: null
  }

  buildFormObj: any = {
    Views: null,
    Build_types: 'CU',
    TestSuites: null,
    Build: false,
    Upgrade: false,
    Run_tests: false,
    Build_image_path: ''
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  navigate() {
    sessionStorage.removeItem('previousURL');
    sessionStorage.setItem('previousURL', this.router.url)
    this.router.navigate(['/jenkins']);
  }

}