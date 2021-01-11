import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'directory',
    loadChildren: () => import('./directory/directory.module').then( m => m.DirectoryPageModule)
  },
  {
    path: 'dumpBailHeight',
    loadChildren: () => import('./dumpBailHeight/dumpBailHeight.module').then(m => m.dumpBailHeightPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: '',
    redirectTo: 'directory',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
