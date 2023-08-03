import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { Signin5Component } from './views/sessions/signin5/signin5.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sessions',
    loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
    data: { title: 'Session' }
  },
  {
    path: '',
    loadChildren: () => import('./views/app-layout/app-layout.module').then(m => m.AppLayoutModule),
    data: { title: 'Home' }
  },
  // {
  //   path: 'home',
  //   component: LandingLayoutComponent,
  //   canActivate: [],
  //   data: { title: 'Home' }
  //   // children: [
  //   //   {
  //   //     path: 'dashboard',
  //   //     loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
  //   //     data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
  //   //   },
  //   // ]
  // },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

