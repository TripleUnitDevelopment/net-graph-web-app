import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }


  CreateCheckoutSession(model: any): Observable<any> {
    return this.post(API_CONSTANTS.payment.createCheckoutSession, model);
  }


  FinalizeOrderPayment(model: any): Observable<any> {
    return this.put(API_CONSTANTS.payment.putOrder, model);
  }

  GetCalculatedCost(model: any): Observable<any> {
    return this.post(API_CONSTANTS.packages.calculateCost, model);
  }

}
