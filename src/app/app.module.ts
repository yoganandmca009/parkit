import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { TransactionsComponent } from './kiosk/transactions/transactions.component';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  declarations: [AppComponent, TransactionsComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
      QRScanner, 
      Flashlight,
      DatePicker
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
