import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChild,
  ViewChildren,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { CompanyItemComponent } from '@app/pages/list/components/company-item/company-item.component';
import { CompanyDto } from '@dto/company.dto';
import { CompaniesService } from '@services/companies.service';
import { InfiniteScrollService } from '@services/infinite-scroll.service';

@Component({
  selector: 'list-page-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements AfterViewInit {
  @ViewChildren('itemRef', { read: ElementRef })
  itemsRef: QueryList<ElementRef>;

  items: CompanyDto[] = this._companiesService.items;
  itemTagName: string;

  @HostListener('mouseup', ['$event'])
  public handleClick(event: Event) {
    const target = this._getItemElement(event.target as HTMLElement);

    if (target) this._router.navigate(['/detail', target.dataset['itemId']]);
  }

  constructor(
    private _factoryResolver: ComponentFactoryResolver,
    private _router: Router,
    private _companiesService: CompaniesService,
    private _infiniteScrollService: InfiniteScrollService,
    private _hostRef: ElementRef
  ) {
    this.itemTagName = this._factoryResolver
      .resolveComponentFactory(CompanyItemComponent)
      .selector.toLocaleUpperCase();
  }

  public ngAfterViewInit() {
    this._infiniteScrollService.initRefs(this._hostRef, this.itemsRef);
    this._infiniteScrollService.requestNewItems =
      this._companiesService.addCompanies;
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
