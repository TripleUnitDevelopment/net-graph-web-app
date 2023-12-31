import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { config } from "environments/config";
import { environment } from "environments/environment";
import { Observable, tap } from 'rxjs';


export class BaseService {

  public apiUrl: string;
  private httpHeaders: HttpHeaders;
  private httpOptions!: {}

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  protected get(url: string, params?: HttpParams): Observable<HttpEvent<any>> {
    this.httpOptions = {
      headers: this.httpHeaders,
      params: params,
      withCredentials: false
    };
    const separator = url.includes('?') ? '&' : '?';

    return this.http.get<any>(`${this.apiUrl}${url}${separator}subscription-key=${config.subscriptionKey}`, this.httpOptions);
  }

  protected post(url: string, data: any, params?: HttpParams, options: { reportProgress?: boolean } = {}): Observable<HttpEvent<any>> {
    this.httpOptions = {
      headers: this.httpHeaders,
      params: params,
      withCredentials: false,
      ...options.reportProgress ? { reportProgress: true, observe: 'events' } : {},
    };
    return this.http.post<any>(`${this.apiUrl}${url}?subscription-key=${config.subscriptionKey}`, data, this.httpOptions);
  }

  protected put(url: string, data: any, params?: HttpParams, options: { reportProgress?: boolean } = {}): Observable<HttpEvent<any>> {
    this.httpOptions = {
      headers: this.httpHeaders,
      params: params,
      withCredentials: false,
      ...options.reportProgress ? { reportProgress: true, observe: 'events' } : {},
    };
    return this.http.put<any>(`${this.apiUrl}${url}?subscription-key=${config.subscriptionKey}`, data, this.httpOptions);
  }
}
