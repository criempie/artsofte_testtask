import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FilterService } from '@services/filter.service';
import { debounceTime } from 'rxjs';

interface Form {
  business_name: FormControl<string>;
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
  private _notStrictedFields: (string | keyof Form)[] = ['business_name'];

  filtersVariants = this._filterService.filtersVariants;

  constructor(
    private _formBuilder: FormBuilder,
    private _filterService: FilterService
  ) {}

  public form = this._formBuilder.nonNullable.group<Form>({
    business_name: this._formBuilder.nonNullable.control(''),
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
      this._filterService.setFilter(key, {
        key,
        value,
        strict: !this._notStrictedFields.includes(key),
      })
    );
  }
}
