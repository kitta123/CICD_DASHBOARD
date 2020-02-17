import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppSettings } from '../appSettings';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isSidebarPinned = false;
  isSidebarToggeled = false;

  constructor(private _http: HttpClient) { }

  private user = new BehaviorSubject<string>(null);
  cast = this.user.asObservable();

  editUser(newUser) {
    this.user.next(newUser);
  }

  toggleSidebar() {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled
    }
  }

  private() {
    return this._http.get(AppSettings.API_ENDPOINT + '/api/testdata_one');
  }

  night(): Observable<any> {
    return this._http.get<any>(AppSettings.API_ENDPOINT + '/api/testdata');
  }

  getValuebyImageId(arg) {
    return this._http.get<any>(AppSettings.API_ENDPOINT + '/api/testdata_one/' + arg);
  }

  getValuebyImageTag(arg) {
    return this._http.get<any>(AppSettings.API_ENDPOINT + '/api/testdata/' + arg);
  }
}
