import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './component/auth/auth.module';
import { CustomerModule } from './component/customer/customer.module';
import { HomeModule } from './component/home/home.module';
import { InvoiceModule } from './component/invoice/invoice.module';
import { NotificationModule } from './notification.module';
import {IslamModule} from "./component/islam/islam.module";
import {PublicHomeModule} from "./component/public-home/public-home.module";
import {Feature1Module} from "./component/feature1/feature1.module";
import { CalendarComponent } from './component/calendar/calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CoreModule,
    AuthModule,
    CustomerModule,
    InvoiceModule,
    HomeModule,
    AppRoutingModule,
    NotificationModule,
    PublicHomeModule,
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
