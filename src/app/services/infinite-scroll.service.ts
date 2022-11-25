import { ElementRef, Injectable, QueryList } from '@angular/core';
import { CompanyDto } from '@dto/company.dto';

@Injectable()
export class InfiniteScrollService {
  public static readonly VIEW_COUNT = 50;
  public static readonly INC_COUNT = 30;

  private _items: CompanyDto[] = [];
  private _itemsView: CompanyDto[] = [];

  private _root: ElementRef;
  private _itemsRef: QueryList<ElementRef>;

  private _intersectionObserver: IntersectionObserver;

  private _firstItemRef: ElementRef | null;
  private _lastItemRef: ElementRef | null;

  private _viewEdges = [0, InfiniteScrollService.VIEW_COUNT - 1];

  private _loading = false;

  private _requestNewItems: (count: number) => Promise<void>;

  public set requestNewItems(fn: (count: number) => Promise<void>) {
    this._requestNewItems = fn;
  }

  public get loading() {
    return this._loading;
  }

  constructor() {}

  public initItems(items: CompanyDto[], itemsView: CompanyDto[]) {
    this._items = items;
    this._itemsView = itemsView;
  }

  public initRefs(root: ElementRef, itemsRef: QueryList<ElementRef>) {
    this._root = root;
    this._itemsRef = itemsRef;

    this._root.nativeElement.scrollTo(0, 0);

    this._intersectionObserver = new IntersectionObserver(
      this._observerCallback.bind(this),
      { root: root.nativeElement, threshold: 0.2 }
    );

    // this._queryListChangesHandler(itemsRef);
    this._itemsRef.changes.subscribe(this._queryListChangesHandler.bind(this));
  }

  private _queryListChangesHandler(list: QueryList<ElementRef>) {
    if (this._firstItemRef) {
      this._intersectionObserver.unobserve(this._firstItemRef.nativeElement);
    }

    if (this._lastItemRef) {
      this._intersectionObserver.unobserve(this._lastItemRef.nativeElement);
    }

    if (list.length !== 0) {
      this._intersectionObserver.observe(list.first.nativeElement);
      this._intersectionObserver.observe(list.last.nativeElement);

      this._firstItemRef = list.first;
      this._lastItemRef = list.last;
    }
  }

  private _observerCallback(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      if (entry.target === this._firstItemRef?.nativeElement) {
        const addedItems = this._addItemsTo('start');
        if (addedItems.length !== 0) {
          // this._root.nativeElement.scrollTo(
          //   0,
          //   this._root.nativeElement.scrollHeight / 2
          // );
          this._removeItemsFrom('end', addedItems.length);
          console.log(this._viewEdges.slice());
        }
      } else if (entry.target === this._lastItemRef?.nativeElement) {
        const addedItems = this._addItemsTo('end');
        if (addedItems.length !== 0) {
          // this._root.nativeElement.scrollTo(
          //   0,
          //   this._root.nativeElement.scrollHeight / 2
          // );
          this._removeItemsFrom('start', addedItems.length);
          console.log(this._viewEdges.slice());
        }
      }
    }

    if (
      !this._loading &&
      this._items.length - this._viewEdges[1] < InfiniteScrollService.INC_COUNT
    ) {
      this._loading = true;
      this._requestNewItems(100).then(() => (this._loading = false));
    }
  }

  private _removeItemsFrom(
    p: 'start' | 'end',
    count = InfiniteScrollService.INC_COUNT
  ) {
    if (p === 'start') {
      this._itemsView.splice(0, count);
      this._viewEdges[0] += count;
    } else if (p === 'end') {
      this._itemsView.splice(-count);
      this._viewEdges[1] -= count;
    }
  }

  private _addItemsTo(
    p: 'start' | 'end',
    count = InfiniteScrollService.INC_COUNT
  ) {
    if (p === 'end') {
      if (this._viewEdges[1] >= this._items.length - 1) return [];

      const nextItems = this._items.slice(
        this._viewEdges[1] + 1,
        this._viewEdges[1] + count
      );

      this._itemsView.push(...nextItems);

      this._viewEdges[1] = Math.min(
        this._viewEdges[1] + count,
        this._items.length - 1
      );

      return nextItems;
    } else if (p === 'start') {
      if (this._viewEdges[0] <= 0) return [];

      const nextItems = this._items.slice(
        this._viewEdges[0] - count,
        this._viewEdges[0] - 1
      );

      this._itemsView.unshift(...nextItems);
      this._viewEdges[0] = Math.max(this._viewEdges[0] - count, 0);

      return nextItems;
    } else {
      return [];
    }
  }
}
