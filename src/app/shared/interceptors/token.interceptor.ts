import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable, switchMap } from "rxjs";
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import { BaseService } from "../services/http/common/base-service";
import { AuthService } from "../services/http/common/auth-service";
import { config } from "environments/config";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private jwtAuth: JwtAuthService, private injector: Injector, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ignore interceptor for the authentication request
    if (req.url.includes(config.tokenUrl)) {
      return next.handle(req);
    }

    const token = this.authService.getToken();
    // console.log("[INTERCEPTOR]: access token ", token);
    if (token) {
      req = req.clone({
        setHeaders: {
          "x-user-token": `${this.authService.getToken()}`,
          "Ocp-Apim-Subscription-Key": config.subscriptionKey
        }
      });
    }
    return next.handle(req);
    //  else {
    //   console.log("[INTERCEPTOR]: access token not found, requesting");
    //   const authService = this.injector.get(AuthService);
    //   return authService.getAccessToken().pipe(
    //     switchMap(() => {
    //       const newToken = localStorage.getItem('access_token');
    //       const changedReq = req.clone({
    //         setHeaders: {
    //           Authorization: `Bearer ${newToken}`
    //         },
    //       });
    //       return next.handle(changedReq);
    //     })
    //   );
    // }
  }
}