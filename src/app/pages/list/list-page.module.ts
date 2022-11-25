import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './components/list-page/list-page.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompaniesService } from '@services/companies.service';
import { CompanySorterComponent } from './components/company-sorter/company-sorter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFilterComponent } from '@app/pages/list/components/company-filter/company-filter.component';
import { FilterService } from '@services/filter.service';
import { SortService } from '@services/sort.service';
import { InfiniteScrollService } from '@services/infinite-scroll.service';

@NgModule({
  declarations: [
    ListPageComponent,
    CompanyItemComponent,
    CompanyListComponent,
    CompanySorterComponent,
    CompanyFilterComponent,
  ],
  providers: [
    CompaniesService,
    FilterService,
    SortService,
    InfiniteScrollService,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ListPageModule {}
