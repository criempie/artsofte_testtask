import { Injectable } from '@angular/core';
import { CompanyDto } from '@dto/company.dto';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompaniesService {
  private static REQUEST_SIZE = 12;

  public items: CompanyDto[] = [];

  constructor() {
    this._updateItems();
  }

  public async fetchCompanies() {
    const response = await axios.get<CompanyDto[]>(
      `${environment.restUrl}/company/random_company?size=${CompaniesService.REQUEST_SIZE}`
    );

    return response.data;
  }

  private async _updateItems() {
    const items = await this.fetchCompanies();

    this.items = items;
  }
}
