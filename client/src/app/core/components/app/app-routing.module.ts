import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../../features/home/home.component';
import { DomainsComponent } from '../../../features/domains/domains.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  title: 'Whois NIC IT'
}, {
  path: 'domains',
  component: DomainsComponent,
  title: 'Domains - Whois NIC IT'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
