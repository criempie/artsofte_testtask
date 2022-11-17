import { Component, Input } from '@angular/core';
import { CompanyDto } from '@dto/company.dto';

@Component({
  selector: 'list-page-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent {
  @Input()
  items: CompanyDto[] = [];

  constructor() {}
}
