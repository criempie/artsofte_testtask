import { Component, ComponentFactoryResolver, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyItemComponent } from '@app/pages/list/components/company-item/company-item.component';
import { CompanyDto } from '@dto/company.dto';

@Component({
  selector: 'list-page-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent {
  @Input()
  items: CompanyDto[] = [];

  itemTagName: string;

  constructor(
    private _factoryResolver: ComponentFactoryResolver,
    private _router: Router
  ) {
    this.itemTagName = _factoryResolver
      .resolveComponentFactory(CompanyItemComponent)
      .selector.toLocaleUpperCase();
  }

  handleClick(event: Event) {
    const target = this._getItemElement(event.target as HTMLElement);

    if (target && target.firstChild)
      this._router.navigate([
        '/detail',
        (target.firstChild as HTMLElement).dataset['itemId'],
      ]);
  }

  private _getItemElement(_target: HTMLElement) {
    let target: HTMLElement | null = _target;
    while (target) {
      if (target.tagName === this.itemTagName) return target;
      else target = target.parentElement;
    }

    return null;
  }
}
