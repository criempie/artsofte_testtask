import { Component, Input } from '@angular/core';
import { CompanyDto } from '@dto/company.dto';

@Component({
  selector: 'list-page-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss'],
})
export class CompanyItemComponent {
  @Input()
  item: CompanyDto;

  constructor() {}

  handleClick(event: Event) {
    // event.stopPropagation();
  }
}
