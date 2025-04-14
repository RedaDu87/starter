import { NgModule } from '@angular/core';
import { Feature1Component } from './feature1/feature1.component';
import {SharedModule} from "../../shared/shared.module";
import {NavBarModule} from "../navbar/navbar.module";
import {Feature1RoutingModule} from "./feature1-routing.module";
import {StatsModule} from "../stats/stats.module";


@NgModule({
  declarations: [
    Feature1Component
  ],
  imports: [ SharedModule, Feature1RoutingModule, NavBarModule, StatsModule ]
})
export class Feature1Module { }
