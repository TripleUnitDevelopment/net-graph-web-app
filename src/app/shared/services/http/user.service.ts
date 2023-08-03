import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  Login(model: any): Observable<any> {
    return this.post(API_CONSTANTS.Auth.Login, model);
  }

  Signup(model: any): Observable<any> {
    return this.post(API_CONSTANTS.Auth.Signup, model);
  }

}
