import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AreasPage } from './areas/areas.page';
import { FolderPage } from './folder/folder.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./areas/areas.module').then( m => m.AreasPageModule)
  },
  {
    path: 'areas',
    loadChildren: () => import('./areas/areas.module').then( m => m.AreasPageModule)
  },  
  {path: 'folder', component: FolderPage},   
  {
    path: 'kiosk',
    loadChildren: () => import('./kiosk/kiosk.module').then( m => m.KioskPageModule)
  },
  {
    path: 'pricing',
    loadChildren: () => import('./pricing/pricing.module').then( m => m.PricingPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./cards/cards.module').then( m => m.CardsPageModule)
  },
  {
    path: 'passes',
    loadChildren: () => import('./passes/passes.module').then( m => m.PassesPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  }
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
