import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  GetAvailableLanguages(): Observable<any> {
    return this.get(API_CONSTANTS.languages.getAvailableLanguages);
  }

}
