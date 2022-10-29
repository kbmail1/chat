import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { MDatepickerComponent } from './molecules/m-datepicker/m-datepicker.component';
import { MoleculeSearchComponent } from './molecules/molecule-search/molecule-search.component';
import { MProgressBarComponent } from './molecules/m-progress-bar/m-progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MDatepickerComponent,
    MoleculeSearchComponent,
    MProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
