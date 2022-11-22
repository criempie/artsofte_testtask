import { Component } from '@angular/core';
import { CompaniesService } from '@app/services/companies.service';
import { CompanyDto } from '@dto/company.dto';
import { FilterService } from '@services/filter.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  constructor(public companiesService: CompaniesService) {}
}
