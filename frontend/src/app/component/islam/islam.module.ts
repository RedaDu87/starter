import { NgModule } from '@angular/core';

import { IslamRoutingModule } from './islam-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from '../navbar/navbar.module';
import {AttributesComponent} from "./attributes/attributes.component";
import {CoranComponent} from "./coran/coran.component";
import {CoursArabeComponent} from "./cours-arabe/cours-arabe.component";
import {HadithComponent} from "./hadith/hadith.component";
import {HomeComponent} from "./home/home.component";
import {InvocationsComponent} from "./invocations/invocations.component";
import {NavComponent} from "./nav/nav.component";
import {ProphetsComponent} from "./prophets/prophets.component";
import {TimelineComponent} from "./timeline/timeline.component";
import {FormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";



@NgModule({
  declarations: [AttributesComponent, CoranComponent, CoursArabeComponent, HadithComponent, HomeComponent, InvocationsComponent, NavComponent, ProphetsComponent, TimelineComponent],
  exports: [
    NavComponent,NavBarModule
  ],
  // ⬅️ ajoute ici
  imports: [SharedModule, IslamRoutingModule, NavBarModule,FormsModule,CoreModule]
})
export class IslamModule {}

