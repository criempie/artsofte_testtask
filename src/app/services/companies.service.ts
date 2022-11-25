import { Injectable } from '@angular/core';
import { CompanyDto } from '@dto/company.dto';
import { FilterService } from '@services/filter.service';
import { InfiniteScrollService } from '@services/infinite-scroll.service';
import { SortService } from '@services/sort.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompaniesService {
  private static REQUEST_SIZE = 100;
  private _items: CompanyDto[] = [];
  private _itemsView: CompanyDto[] = [];

  public get items() {
    return this._itemsView;
  }
  constructor(
    private _filterService: FilterService,
    private _sortService: SortService,
    private _infiniteScrollService: InfiniteScrollService
  ) {
    this._updateItems();
  }

  public async addCompanies(count: number) {
    const items = await CompaniesService.fetchCompanies(count);

    this._items.push(...items);
  }

  public static async fetchCompanies(count?: number) {
    const response = await axios.get<CompanyDto[]>(
      `${environment.restUrl}/company/random_company?size=${
        count ?? CompaniesService.REQUEST_SIZE
      }`
    );

    return response.data;
  }

  public static async fetchCompany(id: number | string) {
    // Так как random-data-api не предоставляет возможности обратиться к конкретному элементу по id
    // можно опустить этот момент и брать еще один случайный
    const item = await CompaniesService.fetchCompanies(1);

    return item[0];
  }

  private async _updateItems() {
    const items = await CompaniesService.fetchCompanies();

    this._items.length = 0;
    this._items.push(...items.slice());

    this._itemsView.length = 0;
    this._itemsView.push(...items.slice(0, InfiniteScrollService.VIEW_COUNT));

    this._filterService.items = this._itemsView;
    this._filterService.clearSettings();

    this._sortService.items = this._itemsView;
    this._sortService.clearSettings();

    this._infiniteScrollService.initItems(this._items, this._itemsView);
  }
}
