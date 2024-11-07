import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AdminModule} from './admin/admin.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PublicModule} from './public/public.module';

import {StrategyProviders} from "./_core/strategies/strategy.providers";
import {UtilsProviders} from "./shared/utils/utils.providers";
import {CommonModule, registerLocaleData} from "@angular/common";
import localePtBr from '@angular/common/locales/pt';

import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    PublicModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgChartsModule,
  ],
  providers: [
    StrategyProviders,
    UtilsProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
