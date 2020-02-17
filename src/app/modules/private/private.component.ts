import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { PrivateService } from './private.service';
import { Subscription } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit, OnDestroy {
  userId: string;
  data: any;
  data1: any;
  img_id: any;
  job_url: any;
  suite_details: any;
  tableData: any = [];
  value: string;
  message: any;
  img_tag: any;
  table: [];
  subscription: Subscription;
  interval: any;
  url: string;
  timeLeft: number = 10;

  @Output() event = new EventEmitter();


  constructor(private activatedRoute: ActivatedRoute,
    private apiservice: AppService,
    private _privateService: PrivateService,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.value = "https://www.google.com";
  }

  ngOnInit() {
    //  this.getBuildNo();
    //  this.getConsoleData();
    this.activatedRoute.params.subscribe(params => {
      this.userId = this.activatedRoute.snapshot.params["userId"];
      this.url = 'http://10.53.159.150:8080/jenkins/job/Build_Generator_ssa/' + this.userId + '/artifact/mkclean.log';
      this.getValuefromImageId(this.userId);
      // setInterval(() => {
      //   this.getConsoleData();
      // }, 5000);
    })
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }


  logInfo: string;
  logData(arg) {
    this.logInfo = arg.replace("['", "").replace(/\\n/g, '<br>').replace("echo", '').replace(']', "<br>");
  }

  getError(err_msg) {
    this.message = err_msg;
  }

  filter_table(condition) {
    this.tableData = this.table;

    if (condition == "pass") {
      this.tableData = this.table.filter(function (record) {
        return record['status'] == "Pass";
      });
    }
    else {
      if (condition == "total") {
        this.tableData = this.table
      }
      else {
        this.tableData = this.table.filter(function (record) {
          return record['status'] == "Fail";
        });
      }
    }
  }
  toggleView: boolean = true;
  total: string;
  name: string;
  executiontime: number;
  pass: number;
  failures: number;
  obs: any;
  getValuefromImageId(userid) {

    this.spinnerService.show();
    this.apiservice.getValuebyImageId(userid).subscribe(
      response => {
        this.data = response;
        this.spinnerService.hide();

        if (this.data != []) {
          this.tableData = this.data[0].testsuite;
          this.table = this.tableData;
          this.job_url = this.data[0].job_url;
          this.img_id = this.data[0].image_name;
          this.img_tag = this.data[0].image_tag;
          this.suite_details = this.data[0].testsuite_details;
          this.total = this.suite_details.total;
          this.executiontime = this.suite_details.executiontime;
          this.name = this.suite_details.name;
          this.pass = this.suite_details.pass;
          this.failures = this.suite_details.failures;
        }
        if (this.img_tag === "null") {
          this.toggleView = false;
          this.getProgressBarData();


          // this.interval = setInterval(function(){ 
          //   this.getProgressBarData();
          // }, 20000);

          this.interval = setInterval(() => {
            if (this.timeLeft == 0) {
              this.timeLeft = 10;
              this.getProgressBarData();
            }
            else {
              this.timeLeft--;

            }
          }, 2000);
        }
        else {
          this.toggleView = true;
          clearInterval(this.interval)
        }
      }
    )
  }
  latestbuild_no: number;
  getBuildNo() {
    var mainData;
    this._privateService.getBuildNo().subscribe(
      data => {
        mainData = data;
        this.latestbuild_no = mainData.buildno;
        this.getProgressBarData();
      })
  }

  progressData: any;
  testcase:string;
  getProgressBarData() {
    this.testcase = localStorage.getItem('testCase');
    var buildname = "Build_Generator_ssa";
    this.subscription = this._privateService.getProgressBarData(buildname, this.userId, this.testcase).subscribe(
      response => {
        this.progressData = response;
        // debugger;
        for (let _progressData of this.progressData) {
          //this.progressData.splice(this.progressData.indexOf(_progressData), 2);
          if (_progressData.name === "GENERATING BUILD" && _progressData.percentage === "100%") {
            alert("Success")
          }
          // else if(_progressData.name === "UPGRADE BUILD USING CREATED IMAGE"){
          //   this.progressData.splice(this.progressData.indexOf(_progressData), 2);
          // }          
        }
        this.getBuildResponse();
        return this.progressData;
      }
    )

  }


  getBuildResponse() {
    var tempData;
    var buildname = "Build_Generator_ssa";
    this.testcase = localStorage.getItem('testCase');
    this._privateService.getBuildResponse(this.userId).subscribe(
      response => {
        tempData = response;
        if (tempData.build.result != null) {
        //  alert("SUCCESS");
          this.apiservice.editUser(null);
          clearInterval(this.interval)
          this.toggleView = true;
          this.getValuefromImageId(this.userId)
          this._privateService.getBuildTestCase(this.testcase, this.userId).subscribe(
            response => {
              const result = response;
            }
          )
        }
      }
    )
  }

  consoleData: any;
  getConsoleData() {
    var latestbuild_no;
    var tempdata;
    var mainData;
    var buildname = "Build_Generator_ssa";
    this._privateService.getBuildNo().subscribe(
      data => {
        mainData = data;
        latestbuild_no = mainData.buildno;
        this._privateService.getConsoleData(buildname, this.userId).subscribe(
          data => {
            tempdata = data;
            this.consoleData = tempdata.consoleop;
          }
        )
      }
    )
  }
}
