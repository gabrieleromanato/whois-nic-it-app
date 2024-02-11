import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainsComponent } from './domains.component';
import { LoaderModule } from "../../shared/components/loader/loader.module";


@NgModule({
  declarations: [
    DomainsComponent
  ],
  imports: [
    CommonModule,
    LoaderModule
  ],
  exports: [
    DomainsComponent
  ]
})
export class DomainsModule { }
