import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { FontSizeDirective } from './font-size.directive';
import { ScrollToDirective } from './scroll-to.directive';
import { AutoFocusDirective } from './auto-focus.directive';


const directives = [
  AutoFocusDirective,
  FontSizeDirective,
  ScrollToDirective,
  ]

@NgModule({
  imports: [
    CommonModule,
    LayoutModule
  ],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule { }