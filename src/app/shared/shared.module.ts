import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICES
import { AuthGuard } from './guards/auth.guard';
import { UserRoleGuard } from './guards/user-role.guard';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppLoaderService } from './services/app-loader/app-loader.service';

import { SharedComponentsModule } from './components/shared-components.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { RoutePartsService } from './services/route-parts.service';

@NgModule({
  imports: [
  CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule    
  ],
  providers: [
    RoutePartsService,
    AuthGuard,
    UserRoleGuard,
    AppConfirmService,
    AppLoaderService
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ]
})
export class SharedModule { }
