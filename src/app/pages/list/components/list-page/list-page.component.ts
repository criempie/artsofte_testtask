import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '@app/pages/list/services/companies.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  constructor(public companiesService: CompaniesService) {}

  ngOnInit(): void {}
}
