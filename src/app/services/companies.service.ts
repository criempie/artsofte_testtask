import { Injectable } from '@angular/core';
import {
  SortDirection,
  SorterItem,
} from '@app/pages/list/components/company-sorter/company-sorter.component';
import { CompanyDto } from '@dto/company.dto';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompaniesService {
  public items: CompanyDto[];

  public set sortDirection(dir: SortDirection) {
    if (dir && this._sortSettings.direction !== dir) {
      this.items.reverse();
    }

    this._sortSettings.direction = dir;
  }

  public get sortDirection() {
    return this._sortSettings.direction;
  }

  private static REQUEST_SIZE = 4;
  private _items: CompanyDto[] = [];
  private _sortSettings: {
    direction: SortDirection;
    byKey: SorterItem['value'] | null;
  } = {
    direction: null,
    byKey: null,
  };

  constructor() {
    this.items = this._items.slice();
    this._updateItems();
  }

  public set sortKey(key: SorterItem['value'] | null) {
    if (!key) {
      this.items = this._items.slice();
      this._sortSettings.direction = null;
      return;
    }

    this.sortItemsBy(key);
    this._sortSettings.direction = 'down';
  }

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

  public sortItemsBy(key: string) {
    if (this.items.length === 0 || !this.items[0].hasOwnProperty(key)) return;

    const _sortCompareFn = (prev: CompanyDto, next: CompanyDto) => {
      if (prev[key as keyof CompanyDto] < next[key as keyof CompanyDto]) {
        return -1;
      } else {
        return 1;
      }
    };

    this.items.sort(_sortCompareFn);
  }

  private async _updateItems() {
    const items = await this.fetchCompanies();

    this._items = items.slice();
    this.items = items.slice();
    if (this._sortSettings.byKey) this.sortItemsBy(this._sortSettings.byKey);
  }
}
