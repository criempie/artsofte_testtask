import { Component, HostBinding, Input } from '@angular/core';
import { CompanyDto } from '@dto/company.dto';

@Component({
  selector: 'list-page-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss'],
})
export class CompanyItemComponent {
  @Input()
  item: CompanyDto;

  @HostBinding('attr.data-item-id') get id() {
    return this.item.id;
  }

  constructor() {}
}
