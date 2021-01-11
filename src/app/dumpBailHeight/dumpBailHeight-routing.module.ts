import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dumpBailHeight } from './dumpBailHeight.page';

const routes: Routes = [
  {
    path: '',
    component: dumpBailHeight,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: '',
        redirectTo: '/dumpBailHeight/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dumpBailHeight/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dumpBailHeightPageRoutingModule {}
