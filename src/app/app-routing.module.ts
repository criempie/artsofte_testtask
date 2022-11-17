import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailComponent } from '@app/pages/detail/components/company-detail/company-detail.component';
import { ListPageComponent } from '@app/pages/list/components/list-page/list-page.component';

const routes: Routes = [
  // { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '', component: ListPageComponent },
  { path: 'detail/:id', component: CompanyDetailComponent },
  { path: 'detail', component: CompanyDetailComponent },
  // { path: '/map' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
