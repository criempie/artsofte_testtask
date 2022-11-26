import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DetailPageModule } from '@app/pages/detail/detail-page.module';
import { ListPageModule } from '@app/pages/list/list-page.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MapComponent } from './pages/map/map.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListPageModule,
    DetailPageModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
