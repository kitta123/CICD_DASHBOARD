import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TestUiService } from '../test-ui.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit {

  constructor(private fb: FormBuilder, private _testUIservice: TestUiService, private _router: Router,
    private spinnerService: Ng4LoadingSpinnerService, private _toastr: ToastrService) { }

    testUI: FormGroup;
    testCaseUI: FormGroup;
    ngOnInit() {
      this.getTestCases();
      this.getTestSuites();
      this.testUI = this.fb.group({
        testsuite: [],
        testcases: this.fb.array([
          this.fb.group({
            testcase: "d",
            commands: null,
            parameter: null,
            results: null
          })
        ])
      })
  
      this.testCaseUI = this.fb.group({
        testcase: null,
        commands: null,
        parameter: null,
        results: null
      })
    }

    testSuites: [];
    getTestSuites() {
      this._testUIservice.getTestSuites().subscribe(
        response => {
          this.testSuites = response;
        }
      )
    }
  
    testCasebyName: any;
    getTestCaseByName(arg) {
      var tempArray: any = [];
      this._testUIservice.getTestcasesByName(arg).subscribe(
        response => {
          this.copy = [];
          this.testCasebyName = response;
        }
      )
    }
  
  
    testcaseObj: any;
    getTestCases() {
      this.testcaseObj = [
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
  
    parameter_one: any = "";
    parameter_two: any = "";
    parameter_three: any = "";
    disabled: boolean = false;
  
    onChangeDrpTestCase(val) {
      if (val == 'reboot') {
        this.disabled = true;
        // this.parameter_one[index] = "Ip Address";
        // this.parameter_two[index] = "UserName"
        // this.parameter_three[index] = "Password"
      } else {
        this.disabled = false;
        // this.parameter_one = "parameter 1";
        // this.parameter_two = "parameter 2"
        // this.parameter_three = "parameter 3"
      }
    }
  
  
  
    copy: any = [];
    pushdata(arg) {
      if (arg.testcase == '' || arg.testcase == null) {
        alert('Please select test case');
      }
      else {
        const tempArray = this.testUI.get('testcases') as FormArray;
        this.copy = Object.assign({}, tempArray)
        this.copy.value.push(this.testCaseModel);
        //  this.testCaseUI.reset()
        this.testCaseModel = {}
      }
  
    }
  
  
    editData(arg, index) {
      this.testCaseModel = arg;
    }
  
    postTestUI() {
  
      this.spinnerService.show();
      this._testUIservice.postTestUI(this.testUI.value).subscribe(
        response => {
          if (response) {
            this._toastr.success('Data saved succesfully', 'Success!');
            this.spinnerService.hide();
            this.getTestSuites();
            $('#testUI').modal('hide');
          }
        }
      )
    }
  
  
  
    clearForm() {
      this.testCaseModel = {}
      this.testCaseModel.testcase = 'select'
    }
  
    deleteTestCase(arg) {
      var ans = confirm("Do you want to delete??");
      if (ans) {
        const index = this.copy.value.indexOf(arg);
        this.copy.value.splice(index, 1);
      }
    }
  
    testCaseModel: any = {
      testcase: null,
      commands: null,
      parameter: null,
      results: null
    }

}
