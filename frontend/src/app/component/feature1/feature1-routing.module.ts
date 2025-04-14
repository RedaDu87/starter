import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';
import {Feature1Component} from "./feature1/feature1.component";


const feature1Routes: Routes = [
  { path: 'feature', component: Feature1Component, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(feature1Routes)],
  exports: [RouterModule]
})
export class Feature1RoutingModule {}
