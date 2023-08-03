import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from 'app/shared/shared-material.module';

import { TranslateModule } from '@ngx-translate/core';
import { Signin5Component } from './signin5/signin5.component';
import { Signup5Component } from './signup5/signup5.component';
import { SessionsRoutes } from './sessions.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule.forChild(SessionsRoutes)
  ],
  declarations: [Signin5Component, Signup5Component]
})
export class SessionsModule { }
