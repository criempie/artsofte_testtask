import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './components/list-page/list-page.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompaniesService } from '@services/companies.service';

@NgModule({
  declarations: [ListPageComponent, CompanyItemComponent, CompanyListComponent],
  providers: [CompaniesService],
  imports: [CommonModule],
})
export class ListPageModule {}
