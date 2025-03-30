import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoranComponent} from "./coran/coran.component";
import {HadithComponent} from "./hadith/hadith.component";
import {CoursArabeComponent} from "./cours-arabe/cours-arabe.component";
import {InvocationsComponent} from "./invocations/invocations.component";
import {TimelineComponent} from "./timeline/timeline.component";
import {ProphetsComponent} from "./prophets/prophets.component";
import {AttributesComponent} from "./attributes/attributes.component";

let routes: Routes;
routes = [
  {path: 'coran', component: CoranComponent},
  {path: 'hadith', component: HadithComponent},
  {path: 'coursarabe', component: CoursArabeComponent},
  {path: 'invocations', component: InvocationsComponent},
  {path: 'attributes', component: AttributesComponent},
  {path: 'prophets', component: ProphetsComponent},
  {path: 'histoire', component: TimelineComponent}  // aucune auth ici
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IslamRoutingModule {}

