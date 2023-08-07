import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  GetAvailableCurrencies(): Observable<any> {
    return this.get(API_CONSTANTS.currencies.getAvailableCurrencies);
  }

}
