import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AppLayoutComponent } from 'app/shared/components/layouts/app-layout/app-layout/app-layout.component';
import { HomeComponent } from '../home/home.component';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppLayoutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    AppLayoutRoutingModule
  ]
})
export class AppLayoutModule { }
