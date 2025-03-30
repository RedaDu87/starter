import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeComponent } from './public-home.component';
import { CoranComponent } from '../islam/coran/coran.component';
import { HadithComponent } from '../islam/hadith/hadith.component';
import { CoursArabeComponent } from '../islam/cours-arabe/cours-arabe.component';
import { InvocationsComponent } from '../islam/invocations/invocations.component';
import { AttributesComponent } from '../islam/attributes/attributes.component';
import { ProphetsComponent } from '../islam/prophets/prophets.component';
import { TimelineComponent } from '../islam/timeline/timeline.component';

const routes: Routes = [
  {
    path: '',
    component: PublicHomeComponent,
    children: [
      { path: 'coran', component: CoranComponent },
      { path: 'hadith', component: HadithComponent },
      { path: 'coursarabe', component: CoursArabeComponent },
      { path: 'invocations', component: InvocationsComponent },
      { path: 'attributes', component: AttributesComponent },
      { path: 'prophets', component: ProphetsComponent },
      { path: 'histoire', component: TimelineComponent },
      { path: '', redirectTo: 'coran', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicHomeRoutingModule {}
