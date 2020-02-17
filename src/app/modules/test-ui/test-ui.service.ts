import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../appSettings';

@Injectable({
  providedIn: 'root'
})

export class TestUiService {


  header: any;
  constructor(private _http: HttpClient) {
      this.header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  getTestcasesByName(arg){
      return this._http.get<any>(AppSettings.API_ENDPOINT + '/api/testcasename/'+arg);
  }


  postSettings(data) {
      // console.log(data);
      return this._http.post(AppSettings.API_ENDPOINT + '/api/json_build', data, { headers: { 'Content-Type': 'application/json' } })
  }

  postBuild(data) {
      // console.log(data);
      return this._http.post(AppSettings.API_ENDPOINT + '/api/json_jenkin', data, { headers: { 'Content-Type': 'application/json' } })
  }

  postTestUI(data){
      console.log(data)
      return this._http.post(AppSettings.API_ENDPOINT + '/api/testSuite', data, { headers: { 'Content-Type': 'application/json' } })
  }

  getTestSuites(){
      return this._http.get<any>(AppSettings.API_ENDPOINT + '/api/testSuite');
  }

  getBuildResponse(buildno) {
      return this._http.get(AppSettings.API_ENDPOINT + '/api/getBuildResponse/Build_Generator_ssa/' + buildno);
  }

  getBuildTypes(arg) {
      return this._http.get<any>(AppSettings.API_ENDPOINT + '/api//json_build_get/' + arg);
  }


  getViews() {
      return this._http.get<any>(AppSettings.API_ENDPOINT + '/api/getview');
  }

  getImagePaths() {
      return this._http.get(AppSettings.API_ENDPOINT + '/api/getimagepath');
  }

}