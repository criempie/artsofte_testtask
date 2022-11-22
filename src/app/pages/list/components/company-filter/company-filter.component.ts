import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { CompaniesService } from '@services/companies.service';
import { FilterService } from '@services/filter.service';
import { debounceTime } from 'rxjs';

interface Form {
  name: FormControl<string>;
  type: FormControl<string>;
  industry: FormControl<string>;
}

type ExtractFormControl<T> = Partial<{
  [K in keyof T]: T[K] extends FormControl<infer U> ? U : T[K];
}>;

@Component({
  selector: 'company-list-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss'],
})
export class CompanyFilterComponent implements OnInit {
  filtersVariants = this._filterService.filtersVariants;

  constructor(
    private _formBuilder: FormBuilder,
    private _filterService: FilterService,
    private _companiesService: CompaniesService
  ) {}

  public form = this._formBuilder.nonNullable.group<Form>({
    name: this._formBuilder.nonNullable.control(''),
    type: this._formBuilder.nonNullable.control(''),
    industry: this._formBuilder.nonNullable.control(''),
  });

  ngOnInit() {
    this._formChangeHandler(this.form.value);

    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this._formChangeHandler.bind(this));
  }

  private _formChangeHandler(values: ExtractFormControl<Form>) {
    Object.entries(values).forEach(([key, value]) =>
      this._filterService.setFilter(key, { key, value })
    );
  }
}
