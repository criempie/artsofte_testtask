import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ListPageModule } from '@app/pages/list/list-page.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule, ListPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
