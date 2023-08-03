import { Routes } from "@angular/router";

import { Signin5Component } from './signin5/signin5.component';
import { Signup5Component } from './signup5/signup5.component';
import { AuthLayoutComponent } from "app/shared/components/layouts/auth-layout/auth-layout.component";

export const SessionsRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: "signup",
        component: Signup5Component,
        data: { title: "Signup" }
      },
      {
        path: "login",
        component: Signin5Component,
        data: { title: "Signin" }
      },
    ]
  },
];
