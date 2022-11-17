import { Injectable } from '@angular/core';
import { CompanyDto } from '@dto/company.dto';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompaniesService {
  private static REQUEST_SIZE = 4;

  public items: CompanyDto[] = [];

  constructor() {
    this._updateItems();
  }

  public async fetchCompanies(count?: number) {
    const response = await axios.get<CompanyDto[]>(
      `${environment.restUrl}/company/random_company?size=${
        count ?? CompaniesService.REQUEST_SIZE
      }`
    );

    return response.data;
  }

  public async fetchCompany(id: number | string) {
    // Так как random-data-api не предоставляет возможности обратиться к конкретному элементу по id
    // можно опустить этот момент и брать еще один случайный
    const item = await this.fetchCompanies(1);

    return item[0];
  }

  private async _updateItems() {
    const items = await this.fetchCompanies();

    this.items = items;
  }
}
