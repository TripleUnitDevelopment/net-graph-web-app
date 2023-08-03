import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchModule } from '../search/search.module';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';



// ALWAYS REQUIRED
import { FooterComponent as LandingFooter } from './footer/footer.component';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from '../services/app-loader/app-loader.component';
import { HeaderComponent } from './header/header.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


const components = [
  AppComfirmComponent,
  AppLoaderComponent,
  HeaderComponent,
  LandingFooter,
  AuthLayoutComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    SearchModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedMaterialModule
  ],
  declarations: components,
  // entryComponents: [AppComfirmComponent, AppLoaderComponent, BottomSheetShareComponent],
  exports: components
})
export class SharedComponentsModule { }
