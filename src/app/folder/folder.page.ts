import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  domElement: any;

  scannedText: string;

  constructor(private activatedRoute: ActivatedRoute,
    private qrScanner: QRScanner) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
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
