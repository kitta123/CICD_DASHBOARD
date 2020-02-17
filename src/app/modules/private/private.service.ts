import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../appSettings';

@Injectable({
    providedIn: "root"
})

// PrivateService buildtwoservice
export class PrivateService {
    testcase:string;

    constructor(private _http: HttpClient) { 
       
    }

    getBuildNo() {
        return this._http.get(AppSettings.API_ENDPOINT + '/api/jenkin_build_number');
    }

    getConsoleData(buildName, buildNo) {
        return this._http.get(AppSettings.API_ENDPOINT + '/api/getConsoleOutput/' + buildName + '/' + buildNo);
    }

    getProgressBarData(buildName, buildNo,testcase) {
        // console.log(AppSettings.API_ENDPOINT + '/api/getjenkinspipeline/' + buildName + '/' + buildNo +'/'+ testcase);
        return this._http.get(AppSettings.API_ENDPOINT + '/api/getjenkinspipeline/' + buildName + '/' + buildNo +'/'+testcase);
    }

    getBuildResponse(buildno) {
        return this._http.get(AppSettings.API_ENDPOINT + '/api/getBuildResponse/Build_Generator_ssa/' + buildno);
    }

    getBuildStatus(buildName, buildNo) {
        return this._http.get(AppSettings.API_ENDPOINT + '/api/getBuildStatus/' + buildName + '/' + buildNo);
    }

    getBuildTestCase(testcase, buildNumber){
        console.log(AppSettings.API_ENDPOINT + '/api/testSuite/' + testcase + '/' + buildNumber)
        return this._http.get(AppSettings.API_ENDPOINT + '/api/testSuite/' + testcase + '/' + buildNumber);
    }
}