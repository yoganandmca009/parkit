import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
//  template:'<div><ngx-datatable [rows]="rows" [columns]="columns"></ngx-datatable></div>'
})
export class AppComponent {
  public appPages = [
    { title: 'Parking Area', url: '/areas', icon: 'business' },
    { title: 'Kiosk', url: '/kiosk', icon: 'qr-code' },
    { title: 'Pricing', url: '/pricing', icon: 'calculator' },
    { title: 'Cards', url: '/cards', icon: 'card' },
    { title: 'Passes', url: '/passes', icon: 'document' },
    //{ title: 'Reports', url: '/reports', icon: 'bar-chart' },
    { title: 'Logout', url: '/logout', icon: 'log-out' }
  ];
  public appPagesLast = [
    //{ title: 'Reports', url: '/reports', icon: 'bar-chart' },
    { title: 'Price Check', url: '/pricecheck', icon: 'logo-euro' }
  ];
  public labels = [];
  public reports =['/allinreport','/reports','/summaryreport','/vehnoreport'];
  constructor() {}
}
