import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { config } from "environments/config";
import { environment } from "environments/environment";
import { Observable, tap } from 'rxjs';
import { JwtAuthService } from "../../auth/jwt-auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl: string;
  private httpHeaders: HttpHeaders;
  private httpOptions!: {}

  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private jwtService: JwtAuthService) {
    this.apiUrl = environment.apiURL;
  }

  getAccessToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key': config.subscriptionKey
      })
    };

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', config.clientId);
    body.set('client_secret', config.clientSecret);
    body.set('scope', config.scope);

    console.log("Fetching user oAuth token");

    return this.http.post<any>(config.tokenUrl, body.toString(), httpOptions).pipe(
      tap(response => {
        console.log("access token:", response);
        localStorage.setItem('access_token', response.access_token);  // Store access token
      }, error => {
        console.log("error", error);
      })
    );
  }

  getToken(): any {
    const token = localStorage.getItem("access_token");
    if (token) {
      return token;
    }
    else {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        return token;
      }
    }
  }

  setToken(userToken): any {
    localStorage.setItem("access_token", userToken);
  }

  removeToken() {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
  }


  isAuthenticated(): boolean {
    try {
      const token = this.getToken();
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      return false;
    }
    catch {
      return false;
    }
  }
}
