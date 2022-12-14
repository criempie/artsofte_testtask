import { Injectable } from '@angular/core';
import { SortService } from '@services/sort.service';

export type FilterValue = string | number | boolean | null | undefined;

export interface Filter {
  key: string;
  value: string | number | boolean | null | undefined;
  strict?: boolean;
}

type DeletedItemsByFilter = { item: any; index: number }[];

interface Filters {
  [name: string]: Filter & { deletedItems: DeletedItemsByFilter };
}

@Injectable()
export class FilterService {
  private _items: Record<string, any>[] = [];
  private _filters: Filters = {};

  public filtersVariants: { [key: string]: string[] } = {};

  public set items(newItems: any[]) {
    this._items = newItems;

    this.filtersVariants['type'] = FilterService.getValuesByKey(
      this._items,
      'type'
    );

    this.filtersVariants['industry'] = FilterService.getValuesByKey(
      this._items,
      'industry'
    );
  }

  public get items() {
    return this._items.slice();
  }

  constructor(private _sortService: SortService) {}

  public clearSettings() {
    this._filters = {};
  }

  public setFilter(name: string, filter: Filter) {
    if (this._filters[name]?.value === filter.value) return;

    if (this._filters[name]?.deletedItems) {
      // this._items.push(...this._filters[name].deletedItems.map((v) => v.item));
      this._filterDeletedItems(this._filters[name].deletedItems, name);
      this._filters[name].deletedItems
        .reverse()
        .forEach((item) => this._items.splice(item.index, 0, item.item));
      this._filters[name].deletedItems = [];
    }

    let deletedItems: any[] = [];
    if (filter.value) deletedItems = this._filter(filter);

    this._filters[name] = { ...filter, deletedItems };

    this._sortService.sort();
  }

  private _filter(filter: Filter) {
    const deleted: DeletedItemsByFilter = [];

    for (let i = this._items.length - 1; i >= 0; i--) {
      const item = this._items[i];

      if (
        !(
          (!filter.strict &&
            item[filter.key].toLowerCase().includes(filter.value)) ||
          item[filter.key] === filter.value
        )
      ) {
        this._items.splice(i, 1);
        deleted.push({ item, index: i });
      }
    }

    return deleted;
  }

  private _filterDeletedItems(
    items: DeletedItemsByFilter,
    excludeName: string
  ) {
    for (const [name, filter] of Object.entries(this._filters)) {
      if (items.length === 0 || !filter.value) break;
      if (name === excludeName) continue;

      const deletedItems = [];
      for (let i = items.length - 1; i >= 0; i--) {
        console.log(items, i);
        if (
          !(
            (!filter.strict &&
              items[i].item[filter.key].toLowerCase().includes(filter.value)) ||
            items[i].item[filter.key] === filter.value
          )
        ) {
          deletedItems.push(...items.splice(i, 1));
        }
      }

      this._filters[name].deletedItems.push(...deletedItems);
    }
  }

  public static getValuesByKey<T, K extends keyof T>(
    arr: T[],
    key: K
  ): string[] {
    const items = new Set();
    arr.forEach((item) => items.add(item[key]));

    return [...items] as string[];
  }
}
