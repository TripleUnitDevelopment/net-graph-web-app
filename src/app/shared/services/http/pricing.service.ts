import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
  providedIn: 'root'
})
export class PackagesService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  GetAvailablePackages(currency: any, language: any): Observable<any> {
    return this.get(`${API_CONSTANTS.packages.getAvailablePackages}?currency=${currency}&language=${language}`);
  }

  ValidateOfferCode(code: any): Observable<any> {
    return this.get(`${API_CONSTANTS.packages.validateOfferCode}${code}`);
  }

  GetCalculatedCost(model: any): Observable<any> {
    return this.post(API_CONSTANTS.Auth.Signup, model);
  }

}
