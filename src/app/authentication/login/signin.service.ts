import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../appSettings';

@Injectable()
export class SigninService {
  constructor(private http: HttpClient) { }

  userNamePassword(arg1, arg2) {
    return this.http.get(AppSettings.API_ENDPOINT + '/api/login/' + arg1 + '/' + arg2);
  }
}

//grant_type=password&client_id=MagnaWeb&client_secret=Magna@Web&username=si&password=123