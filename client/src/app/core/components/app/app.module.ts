import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule} from "../../../shared/components/header/header.module";
import { HomeModule } from "../../../features/home/home.module";
import { DomainsModule } from "../../../features/domains/domains.module";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    HomeModule,
    DomainsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
