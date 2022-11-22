import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortService } from '@services/sort.service';

export interface SorterItem {
  value: string;
  alias?: string;
  default?: boolean;
}

@Component({
  selector: 'company-list-company-sorter',
  templateUrl: './company-sorter.component.html',
  styleUrls: ['./company-sorter.component.scss'],
})
export class CompanySorterComponent implements OnInit {
  constructor(public sortService: SortService) {}

  ngOnInit() {}

  public selectedChangeHandler(event: Event) {
    const target = event.target as HTMLSelectElement;

    this.sortService.selected = target.value;
  }
}
