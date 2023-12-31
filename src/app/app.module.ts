import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

// import { GestureConfig } from '@angular/material/core';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';

import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { PricingComponent } from './views/pricing/pricing.component';
import { AuthService } from './shared/services/http/common/auth-service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PricingCalculatorComponent } from './views/pricing-calculator/pricing-calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from './shared/shared-material.module';
import { PaymentComponent } from './views/payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentSuccessComponent } from './views/payment/payment-success/payment-success.component';
import { PaymentFailedComponent } from './views/payment/payment-failed/payment-failed.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    LayoutModule,
    SharedMaterialModule,
    NgxStripeModule.forRoot('pk_test_51NdY7WELgniAMxuJtKnD7qv47kucqohMMXlgA2b7K4bwyVHMiYNNnLJuGVi3bXRLxdTiWm8bQYR2j6JlGZGJHjhy00UqZeHtCL'),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  declarations: [AppComponent, PricingComponent, PricingCalculatorComponent, PaymentComponent, PaymentSuccessComponent, PaymentFailedComponent],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    // { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    // REQUIRED IF YOU USE JWT AUTHENTICATION
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }