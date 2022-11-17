import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { CompaniesService } from '@services/companies.service';

@NgModule({
  declarations: [CompanyDetailComponent],
  providers: [CompaniesService],
  imports: [CommonModule],
})
export class DetailPageModule {}
