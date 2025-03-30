import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PublicHomeComponent } from './public-home.component';
import { NavBarModule } from '../navbar/navbar.module';
import { IslamModule } from '../islam/islam.module';
import {PublicHomeRoutingModule} from "./public-homel-routing.module";

@NgModule({
  declarations: [PublicHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PublicHomeRoutingModule,
    NavBarModule,
    IslamModule
  ]
})
export class PublicHomeModule {}
