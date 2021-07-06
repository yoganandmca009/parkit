import { Component, OnInit } from '@angular/core';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import AppUtils from '../utils/app.utils';
import { ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.page.html',
  styleUrls: ['./kiosk.page.scss'],
})
export class KioskPage implements OnInit {

  domElement: any;
  camWindow: any;
  _this: any;

  transactionStatus: string;
  transactionId: string;
  transactionTransId: string;
  vehicleType: string = "---";
  cardType: string = "---";
  scannedText: string = "---";
  vehicleNo: string;


  kioskMode: string = "scanner";
  isCameraOn: boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
    private qrScanner: QRScanner, private flashlight: Flashlight, private appUtils: AppUtils,
    private changeDetectorRef: ChangeDetectorRef, private toastController: ToastController,
    private router: Router) {
    this.flashlight = new Flashlight();
  }

  ngOnInit() {
    this.domElement = window.document.querySelector('ion-app') as HTMLElement;
    this.camWindow = window.document.querySelector('#qr-cam-window') as HTMLElement;
    this.prepare();
    this.scannedText = "";
    this._this = this;
    this.transactionStatus;
  }

  ionViewWillLeave() {
    this.hideCamera();
  }

  prepare() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        console.log("authorized:" + status.authorized);
        console.log("canEnableLight:" + status.canEnableLight);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Run this function.
  startScan() {
    this.isCameraOn = true;
    console.log("Showing camera");
    this.domElement.classList.add('has-camera');
    this.camWindow.classList.remove('cam-window-none');
    this.camWindow.classList.add('cam-window');
    this.qrScanner.show();

    const scanSub = this.qrScanner.scan()
      .subscribe((text: string) => {
        scanSub.unsubscribe();
        this.onScan(text);
      });
  }

  hideCamera() {
    console.log("Hiding camera");
    this.qrScanner.hide();
    this.domElement.classList.remove('has-camera');
    this.camWindow.classList.remove('cam-window');
    this.camWindow.classList.add('cam-window-none');
    this.isCameraOn = false;
    this.changeDetectorRef.detectChanges();
  }

  onScan(text: string) {
    this.scannedText = text;
    this.hideCamera();
    console.log('Scanned:', text);
    //this.domElement.querySelector("#scan_output").innerText = text;
    this.vehicleType = this.scannedText.split("_")[0];
    this.cardType = this.scannedText.split("_")[1];
    this.changeDetectorRef.detectChanges();
    this.checkToBeginTrasaction();
  }

  check() {
    if (this.vehicleNo && this.vehicleNo.trim().length > 0) {
      this.checkToBeginTrasaction();
    } else {
      console.log("Vehicle no is mandatory");
      this.activateToast("Vehicle no is mandatory", "danger");
    }
  }

  checkToBeginTrasaction() {
    var requestBody = { "qrcode": this.scannedText, "vehicle_no": this.vehicleNo, "mode": this.kioskMode, "db_name": "newbr_sample" };
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/qrcodecheck", postData, headers, "POST").subscribe(data => {
      console.log("Qr Code Check:" + JSON.stringify(data));
      this.renderButton(data);
      this.changeDetectorRef.detectChanges();
    });
  }

  renderButton(data) {    
    this.transactionStatus = data.status;
    this.vehicleNo = data.vehicle_no;
    this.changeDetectorRef.detectChanges();
    this.transactionId = data.id;
    this.transactionTransId = data.trans_id;
    this.changeDetectorRef.detectChanges();
  }

  transact() {
    console.log("calling transact() method " + this.transactionStatus);
    if (this.transactionStatus == "start") {
      this.startCharge();
    } else {
      this.endCharge();
    }
    console.log("calling transact() method");
    this.changeDetectorRef.detectChanges();
  }

  startCharge() {
    if (this.vehicleNo && this.vehicleNo.trim().length > 0) {
      var requestBody = { "vehicle_type": this.vehicleType, "card_type": this.cardType, "qrcode": this.scannedText, vehicle_no: this.vehicleNo, mode: this.kioskMode, "db_name": "newbr_sample" }
      var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
      var postData = "myData=" + JSON.stringify(requestBody);
      this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/startcharge", postData, headers, "POST").subscribe(data => {
        console.log("Qr Code Check:" + data.status);        
        this.activateToast("Transaction Started", "success");
        this.transactionStatus = undefined;
        this.changeDetectorRef.detectChanges();
      });
    } else {
      console.log("Vehicle no is mandatory");
      this.activateToast("Vehicle no is mandatory", "danger");
    }
  }

  endCharge() {
    var requestBody = { "id": this.transactionId, "trans_id": this.transactionTransId, "qrcode": this.scannedText, vehicle_no: this.vehicleNo, mode: this.kioskMode, "db_name": "newbr_sample" };
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/endcharge", postData, headers, "POST").subscribe(data => {
      console.log("Qr Code Check:" + data);      
      this.activateToast("Transaction Completed", "success");
      this.transactionStatus = undefined;
      this.changeDetectorRef.detectChanges();
    });
  }

  getVehicleType(type) {
    return this.appUtils.getVehicleType(type);
  }

  getCardType(type) {
    return this.appUtils.getCardType(type);
  }

  close() {
    this.hideCamera();
    this.reset();
    this.router.navigateByUrl("kiosk");
    this.changeDetectorRef.detectChanges();
  }

  onKioskModeChange(e) {
    console.log("onKioskModeChange=" + e.detail.value);
    this.kioskMode = e.detail.value;
    this.reset();
  }

  async activateToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  reset() {
    this.transactionStatus = undefined;
    this.transactionId = undefined;
    this.transactionTransId = undefined;
    this.vehicleType = "---";
    this.cardType = "---";
    this.scannedText = "---";
    this.vehicleNo = undefined;
  }

}
