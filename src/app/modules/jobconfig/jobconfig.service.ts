import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../appSettings';

@Injectable({
  providedIn: 'root'
})
export class JobconfigService {

  header: any;

  username: string;
  password: string;
  constructor(private _http: HttpClient) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.username = sessionStorage.getItem('Username');
    this.password = sessionStorage.getItem('Password');
  }

  postSettings(data) {
    // console.log(data);
    return this._http.post(AppSettings.API_ENDPOINT + '/api/json_build', data, { headers: { 'Content-Type': 'application/json' } })
  }

  postBuild(data) {
    // console.log(data);
    return this._http.post(AppSettings.API_ENDPOINT + '/api/json_jenkin', data, { headers: { 'Content-Type': 'application/json' } })
  }

  postTestUI(data) {
    console.log(data)
    return this._http.post(AppSettings.API_ENDPOINT + '/api/testSuite', data, { headers: { 'Content-Type': 'application/json' } })
  }

  getTestSuites() {
    return this._http.get<any>(AppSettings.API_ENDPOINT + '/api/testSuite');
  }

  getBuildResponse(buildno) {
    return this._http.get(AppSettings.API_ENDPOINT + '/api/getBuildResponse/Build_Generator_ssa/' + buildno);
  }

  getBuildTypes(arg) {
    return this._http.get<any>(AppSettings.API_ENDPOINT + '/api//json_build_get/' + arg);
  }

  getViews() {
    console.log(AppSettings.API_ENDPOINT + '/api/getview/' + this.username + '/' + this.password)
    return this._http.get<any>(AppSettings.API_ENDPOINT + '/api/getview/' + this.username + '/' + this.password);
  }

  getImagePaths() {
    console.log(AppSettings.API_ENDPOINT + '/api/getimagepath/' + this.username + '/' + this.password)
    return this._http.get(AppSettings.API_ENDPOINT + '/api/getimagepath/' + this.username + '/' + this.password);
  }


}
