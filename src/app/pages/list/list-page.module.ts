import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './components/list-page/list-page.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompaniesService } from '@services/companies.service';
import { CompanyFilterComponent } from './components/company-filter/company-filter.component';
import { CompanySorterComponent } from './components/company-sorter/company-sorter.component';

@NgModule({
  declarations: [
    ListPageComponent,
    CompanyItemComponent,
    CompanyListComponent,
    CompanyFilterComponent,
    CompanySorterComponent,
  ],
  providers: [CompaniesService],
  imports: [CommonModule],
})
export class ListPageModule {}
