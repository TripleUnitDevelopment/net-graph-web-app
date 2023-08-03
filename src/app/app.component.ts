import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { RoutePartsService } from './shared/services/route-parts.service';

import { filter } from 'rxjs/operators';
import { LayoutService } from './shared/services/layout.service';
import { AuthConfig, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { config } from 'environments/config';


// export const authConfig: AuthConfig = {
//   issuer: 'https://login.microsoftonline.com/a8ad6ad6-67ce-4e12-809b-c675c9f07d56/v2.0',
//   redirectUri: 'http://localhost:4200/sessions',  // Replace with your app's redirect URL
//   clientId: config.clientId,  // Replace with your app's client ID
//   responseType: 'code',
//   scope: config.scope,  // Replace with your app's scopes
//   showDebugInformation: true,  // Also enable to see output in the console.
//   strictDiscoveryDocumentValidation: false,
//   // tokenEndpoint: 'https://login.microsoftonline.com/a8ad6ad6-67ce-4e12-809b-c675c9f07d56/oauth2/v2.0/token'
// };


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  appTitle = 'NetGraph';
  pageTitle = '';

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private layoutService: LayoutService,
    private oauthService: OAuthService
  ) {
  }

  ngOnInit() {
    this.changePageTitle();
    // this.oauthService.configure(authConfig);
    // this.oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));
    // this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
    //   if (!this.oauthService.hasValidAccessToken()) {
    //     this.oauthService.initLoginFlow();
    //   } else {
    //     // The user is already authenticated. You can get the token like this.
    //     let token = this.oauthService.getAccessToken();
    //     console.log('token', token);
    //   }
    // });
    // this.themeService.applyMatTheme(this.layoutService.layoutConf.matTheme);
  }

  ngAfterViewInit() {
  }

  changePageTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
      const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length) {
        return this.title.setTitle(this.appTitle);
      }
      // Extract title from parts;
      this.pageTitle = routeParts
        .reverse()
        .map((part) => part.title)
        .reduce((partA, partI) => { return `${partA} > ${partI}` });
      this.pageTitle += ` | ${this.appTitle}`;
      this.title.setTitle(this.pageTitle);
    });
  }
}
