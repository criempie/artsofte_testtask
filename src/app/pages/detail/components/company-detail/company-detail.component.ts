import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDto } from '@dto/company.dto';
import { CompaniesService } from '@services/companies.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent {
  item: CompanyDto;
  loading = true;

  constructor(private _route: ActivatedRoute, private _router: Router) {
    const id = this._route.snapshot.paramMap.get('id');

    if (!id) {
      this._router.navigate(['/'], { replaceUrl: true });
    } else {
      CompaniesService.fetchCompany(id!).then((item) => {
        this.item = item;
        this.loading = false;
      });
    }
  }
}
