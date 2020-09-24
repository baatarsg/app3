import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule, ServerDataSource } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Ng2SmartTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
