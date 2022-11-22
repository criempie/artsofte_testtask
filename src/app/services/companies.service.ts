import { Injectable } from '@angular/core';
import { CompanyDto } from '@dto/company.dto';
import { FilterService } from '@services/filter.service';
import { SortService } from '@services/sort.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompaniesService {
  private static REQUEST_SIZE = 4;
  private _items: CompanyDto[] = [];
  private _itemsView: CompanyDto[] = [];

  public get items() {
    return this._itemsView;
  }

  constructor(
    private _filterService: FilterService,
    private _sortService: SortService
  ) {
    this._updateItems();
  }

  // public set sortDirection(dir: SortDirection) {
  //   if (dir && this._sortSettings.direction !== dir) {
  //     this.items.reverse();
  //   }

  //   this._sortSettings.direction = dir;
  // }

  // public get sortDirection() {
  //   return this._sortSettings.direction;
  // }

  // private _sortSettings: {
  //   direction: SortDirection;
  //   byKey: SorterItem['value'] | null;
  // } = {
  //   direction: null,
  //   byKey: null,
  // };

  // public set sortKey(key: SorterItem['value'] | null) {
  //   if (!key) {
  //     this.items = this._items.slice();
  //     this._sortSettings.direction = null;
  //     return;
  //   }

  //   this.sortItemsBy(key);
  //   this._sortSettings.direction = 'down';
  // }

  public async fetchCompanies(count?: number) {
    const response = await axios.get<CompanyDto[]>(
      `${environment.restUrl}/company/random_company?size=${
        count ?? CompaniesService.REQUEST_SIZE
      }`
    );

    return response.data;
  }

  public async fetchCompany(id: number | string) {
    // Так как random-data-api не предоставляет возможности обратиться к конкретному элементу по id
    // можно опустить этот момент и брать еще один случайный
    const item = await this.fetchCompanies(1);

    return item[0];
  }

  // public sortItemsBy(key: string) {
  //   if (this.items.length === 0 || !this.items[0].hasOwnProperty(key)) return;

  //   const _sortCompareFn = (prev: CompanyDto, next: CompanyDto) => {
  //     if (prev[key as keyof CompanyDto] < next[key as keyof CompanyDto]) {
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   };

  //   this.items.sort(_sortCompareFn);
  // }

  // public filterBy(filters: Filter[]) {
  //   const result = this._items.slice();

  //   filters.forEach((filter) =>
  //     FilterService.filter(result, filter.key, filter.value)
  //   );

  //   this.items = result;
  // }

  private async _updateItems() {
    const items = await this.fetchCompanies();

    this._items = items.slice();
    this._itemsView = items.slice();

    this._filterService.items = this._itemsView;
    this._filterService.clearSettings();

    this._sortService.items = this._itemsView;
    this._sortService.clearSettings();

    // if (this._sortSettings.byKey) this.sortItemsBy(this._sortSettings.byKey);
  }
}
