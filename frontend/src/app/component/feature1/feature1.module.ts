import { NgModule } from '@angular/core';
import { Feature1Component } from './feature1/feature1.component';
import {SharedModule} from "../../shared/shared.module";
import {NavBarModule} from "../navbar/navbar.module";
import {Feature1RoutingModule} from "./feature1-routing.module";
import {StatsModule} from "../stats/stats.module";
import {CalendarComponent} from "../calendar/calendar.component";
import {FullCalendarModule} from "@fullcalendar/angular";
import {IslamModule} from "../islam/islam.module";


@NgModule({
  declarations: [
    Feature1Component,CalendarComponent
  ],
  imports: [SharedModule, Feature1RoutingModule, NavBarModule, StatsModule,
    FullCalendarModule, IslamModule]
})
export class Feature1Module { }
