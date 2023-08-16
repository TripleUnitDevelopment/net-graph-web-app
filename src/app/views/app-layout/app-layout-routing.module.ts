import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from 'app/shared/components/layouts/app-layout/app-layout/app-layout.component';
import { HomeComponent } from '../home/home.component';
import { PricingComponent } from '../pricing/pricing.component';
import { PricingCalculatorComponent } from '../pricing-calculator/pricing-calculator.component';
import { PaymentComponent } from '../payment/payment.component';
import { PaymentSuccessComponent } from '../payment/payment-success/payment-success.component';
import { PaymentFailedComponent } from '../payment/payment-failed/payment-failed.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [{
      path: 'home',
      component: HomeComponent,
      data: { title: 'Home', breadcrumb: 'OVERVIEW' }
    },
    {
      path: 'pricing',
      component: PricingComponent,
      data: { title: 'Pricing', breadcrumb: 'PRICING' }
    },
    {
      path: 'payment/:packageID/:costID',
      component: PaymentComponent,
      data: { title: 'Payment', breadcrumb: 'PAYMENT' }
    },
    {
      path: 'SuccessPayment',
      component: PaymentSuccessComponent,
      data: { title: 'Payment Success', breadcrumb: 'PAYMENTSUCCESS' }
    },
    {
      path: 'CancelPayment',
      component: PaymentFailedComponent,
      data: { title: 'Payment Failed', breadcrumb: 'PAYMENTSUCCESS' }
    },
    {
      path: 'pricing-calculator/:plan/:currency', ///:plan //Disabled, replaced with query param obj
      component: PricingCalculatorComponent,
      data: { title: 'Package Calculator ', breadcrumb: 'PRICINGCALCULATOR' }
    },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
