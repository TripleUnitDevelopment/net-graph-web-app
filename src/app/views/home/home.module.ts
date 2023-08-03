import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: []
})
export class HomeModule { }
