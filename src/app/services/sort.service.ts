import { EventEmitter, Injectable } from '@angular/core';
import { SorterItem } from '@app/pages/list/components/company-sorter/company-sorter.component';
import { CompanyDto } from '@dto/company.dto';

@Injectable()
export class SortService {
  private _items: CompanyDto[] = [];
  private _variants: SorterItem[] = [];
  private _reversed: boolean = false;
  private _key: string | null = null;

  public set items(newItems) {
    this._items = newItems;
    this._reversed = false;
    this._key = null;
  }

  public get items() {
    return this._items.slice();
  }

  public get variants() {
    return this._variants;
  }

  public get reversed() {
    return this._reversed;
  }

  public get selected() {
    return this._key;
  }

  public set selected(key) {
    this._key = key;

    if (key) {
      this._reversed = false;
      this._sort();
    }
  }

  constructor() {
    this._variants = [
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

  public clearSettings() {
    this._reversed = false;
    this._key = null;
  }

  public changeReversed() {
    this._reversed = !this._reversed;
    this._items.reverse();
  }

  public sort() {
    this._sort();
  }

  private _sort() {
    if (!this._key) return;

    this._items.sort(this._sortCompareFn.bind(this));
  }

  private _sortCompareFn(prev: CompanyDto, next: CompanyDto) {
    if (
      prev[this._key as keyof CompanyDto] ===
      next[this._key as keyof CompanyDto]
    ) {
      return 0;
    }

    if (
      prev[this._key as keyof CompanyDto] < next[this._key as keyof CompanyDto]
    ) {
      return this._reversed ? 1 : -1;
    } else {
      return this._reversed ? -1 : 1;
    }
  }
}
