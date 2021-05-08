import { Component, OnInit } from '@angular/core';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.page.html',
  styleUrls: ['./kiosk.page.scss'],
})
export class KioskPage implements OnInit {

  domElement: any;

  scannedText: string;

  constructor(private activatedRoute: ActivatedRoute,
    private qrScanner: QRScanner) { }

  ngOnInit() {    
    this.domElement = window.document.querySelector('ion-app') as HTMLElement;
    this.prepare();
    this.scannedText = "Hi";
  }

  ionViewWillLeave() {
    this.hideCamera(this.scannedText);
  }

  prepare() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        console.log(status.authorized);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Run this function.
  startScan() {   
    console.log("Showing camera");
    this.qrScanner.show();
    this.domElement.classList.add('has-camera');

    const scanSub = this.qrScanner.scan()
      .subscribe((text: string) => {
        scanSub.unsubscribe();
        this.onScan(text);
      });
  }

  hideCamera(text: string) {
    console.log("Hiding camera");
    this.qrScanner.hide();
    this.domElement.classList.remove('has-camera');    
    this.scannedText = text;
  }

  onScan(text: string) {
    this.scannedText = text;
    this.hideCamera(text);
    console.log('Scanned:', text);
    this.domElement.querySelector("#scan_output").innerText=text;
  }

}
