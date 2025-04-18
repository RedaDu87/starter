import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  // Page d'accueil publique
  {
    path: '',
    loadChildren: () =>
      import('./component/public-home/public-home.module').then(m => m.PublicHomeModule)
  },

  {
    path: 'feature',
    loadChildren: () =>
      import('./component/feature1/feature1.module').then(m => m.Feature1Module)
  }
,
  // Profil utilisateur protégé par un guard
  {
    path: 'profile',
    loadChildren: () =>
      import('./component/profile/user.module').then(m => m.UserModule),
    canActivate: [AuthenticationGuard]
  },

  // Wildcard pour les routes inconnues - redirige vers une page 404 ou accueil
  {
    path: '**',
    redirectTo: '', // ou crée un module 404 spécifique
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
