import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./component/public-home/public-home.module').then(m => m.PublicHomeModule) },
  {
    path: 'profile',
    loadChildren: () => import('./component/profile/user.module').then(m => m.UserModule),
    canActivate: [AuthenticationGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
