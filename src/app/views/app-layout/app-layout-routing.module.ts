import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from 'app/shared/components/layouts/app-layout/app-layout/app-layout.component';
import { HomeComponent } from '../home/home.component';
import { PricingComponent } from '../pricing/pricing.component';

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
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
