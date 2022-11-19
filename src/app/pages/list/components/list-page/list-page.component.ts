import { Component } from '@angular/core';
import {
  SortDirection,
  SorterItem,
} from '@app/pages/list/components/company-sorter/company-sorter.component';
import { CompaniesService } from '@app/services/companies.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  constructor(public companiesService: CompaniesService) {}

  changeSortDirectionHandler(dir: SortDirection) {
    this.companiesService.sortDirection = dir;
  }

  changeSortSelectedValueHandler(value: SorterItem['value']) {
    this.companiesService.sortKey = value;
  }

  public sorterItems: SorterItem[] = [
    {
      value: 'business_name',
      alias: 'Имя',
    },
    {
      value: 'type',
      alias: 'Тип',
    },
    {
      value: 'industry',
      alias: 'Вид деятельности',
    },
  ];
}
