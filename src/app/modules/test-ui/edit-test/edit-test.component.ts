import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TestUiService } from '../test-ui.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit {

  constructor(private fb: FormBuilder, private _testUIservice: TestUiService, private _router: Router,
    private spinnerService: Ng4LoadingSpinnerService, private _toastr: ToastrService) { }

  testCaseUI: FormGroup;

  ngOnInit() {
    this.getTestSuites();

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

}
