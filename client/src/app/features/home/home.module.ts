import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from "@angular/forms";
import { LoaderModule } from "../../shared/components/loader/loader.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoaderModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
