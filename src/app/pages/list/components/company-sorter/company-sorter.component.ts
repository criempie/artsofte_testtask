import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SorterItem {
  value: string;
  alias?: string;
  default?: boolean;
}

export type SortDirection = null | 'up' | 'down';

@Component({
  selector: 'company-list-company-sorter',
  templateUrl: './company-sorter.component.html',
  styleUrls: ['./company-sorter.component.scss'],
})
export class CompanySorterComponent implements OnInit {
  @Output()
  directionOnChange = new EventEmitter<SortDirection>();

  @Output()
  selectedOnChange = new EventEmitter<SorterItem['value']>();

  @Input()
  items: SorterItem[] = [];

  @Input()
  direction: SortDirection;

  private _selectedValue: SorterItem['value'] | null = null;

  public get selectedValue() {
    return this._selectedValue;
  }

  ngOnInit() {
    const defaultItem = this.items.find((item) => item.default);

    if (defaultItem) this._selectedValue = defaultItem.value;
  }

  public changeDirection() {
    if (this.direction === 'down') this.directionOnChange.emit('up');
    else this.directionOnChange.emit('down');
  }

  public selectChangeHandler(event: Event) {
    const target = event.target as HTMLSelectElement;

    this._selectedValue = target.value;
    this.selectedOnChange.emit(target.value);
  }
}
