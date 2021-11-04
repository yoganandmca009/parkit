import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AreasPage } from './areas/areas.page';
import { FolderPage } from './folder/folder.page';
import { TransactionsComponent } from './kiosk/transactions/transactions.component';


const routes: Routes = [
  {
    path: '',
   // loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
   loadChildren: () => import('./areas/areas.module').then( m => m.AreasPageModule)
  },
  {
    path: 'areas',
    loadChildren: () => import('./areas/areas.module').then( m => m.AreasPageModule)
  },  
  {path: 'folder', component: FolderPage},   
  {
    path: 'kiosk/scan',
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
  },
  {
    path: 'allinreport',
    loadChildren: () => import('./allinreport/allinreport.module').then( m => m.AllinreportPageModule)
  },
  {
    path: 'summaryreport',
    loadChildren: () => import('./summaryreport/summaryreport.module').then( m => m.SummaryreportPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'kiosk', component: TransactionsComponent 
  },
  {
    path: 'kiosk/manual',
    loadChildren: () => import('./kiosk/manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'allinreport',
    loadChildren: () => import('./allinreport/allinreport.module').then( m => m.AllinreportPageModule)
  },
  {
    path: 'summaryreport',
    loadChildren: () => import('./summaryreport/summaryreport.module').then( m => m.SummaryreportPageModule)
  },
  {
    path: 'pricecheck',
    loadChildren: () => import('./pricecheck/pricecheck.module').then( m => m.PricecheckPageModule)
  },
  {
    path: 'vehnoreport',
    loadChildren: () => import('./vehnoreport/vehnoreport.module').then( m => m.VehnoreportPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
