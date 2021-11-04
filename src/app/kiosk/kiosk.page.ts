import { Component, OnInit } from '@angular/core';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import AppUtils from '../utils/app.utils';
import { ChangeDetectorRef } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AudioManagement } from '@ionic-native/audio-management/ngx';







@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.page.html',
  styleUrls: ['./kiosk.page.scss'],
})
export class KioskPage implements OnInit {

  domElement: any;
  camWindow: any;
  _this: any;
  isOn: boolean = false;
  transactionStatus: string;
  transactionId: string;
  transactionTransId: string;
  vehicleType: string = "---";
  cardType: string = "---";
  scannedText: string = "---";
  vehicleNo: string;
  is_helmet:boolean=false;
  is_keys:boolean=false;
  transStartTime:string="";


  kioskMode: string = "scanner";
  isCameraOn: boolean = false;
  cardmode: string = "regular";

  price: string = "0";
  duration: string = "0H0M";

  isDone: boolean= false;
  inCount: number=0;
  rows:any;
  columns:any;
  

  constructor(private activatedRoute: ActivatedRoute,
    private qrScanner: QRScanner, private flashlight: Flashlight, private appUtils: AppUtils,
    private changeDetectorRef: ChangeDetectorRef, private toastController: ToastController,
    private router: Router, private alertCtrl: AlertController,private nativeAudio: NativeAudio, private audio: AudioManagement) {
    this.flashlight = new Flashlight();
    this.setRingtone();
    
  }
  setRingtone() {
    // Preload the audio track 
    console.log("In set Ringtone..")
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/notifications/beep.mp3');
  }
  playSingle() {
    this.nativeAudio.play('uniqueId1').then(() => {
      console.log('Successfully played');
     // this.showAlert();
    }).catch((err) => {
      console.log('error', err);
    });
  }
  ngOnInit() {
    //this.playSingle();
    this.domElement = window.document.querySelector('ion-app') as HTMLElement;
    this.camWindow = window.document.querySelector('#qr-cam-window') as HTMLElement;
    this.prepare();
    this.scannedText = "";
    this._this = this;
    this.transactionStatus;
    this.getInCount();
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
  startScan(mode) {    
    if (mode == "in") {
      if (!this.vehicleNo || this.vehicleNo.trim().length == 0) {
        console.log("Vehicle no is mandatory");
        this.presentWarning("Vehicle no is mandatory");
        return;
      }
    }
    this.isCameraOn = true;
    this.changeDetectorRef.detectChanges();
    console.log("Showing camera");
    this.domElement.classList.add('has-camera');
    this.camWindow.classList.remove('cam-window-none');
    this.camWindow.classList.add('cam-window');
    this.qrScanner.show();
    const scanSub = this.qrScanner.scan()
      .subscribe((text: string) => {
        scanSub.unsubscribe();
        this.onScan(text, mode);
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

  onScan(text: string, mode: string) {
    this.scannedText = text;
    this.hideCamera();
    console.log('Scanned:', text);
    //this.domElement.querySelector("#scan_output").innerText = text;
    var len=this.scannedText.split("_").length
    if (len != 3) {
      console.log("In valid Card");
      this.presentWarning("In Valid Card");
      return;
    }
    
    this.vehicleType = this.scannedText.split("_")[0];
    this.cardType = this.scannedText.split("_")[1];
    this.changeDetectorRef.detectChanges();
    this.checkToBeginTrasaction(mode);
  }

  getInCount(){
    var requestBody = {  "db_name": "newbr_sample" };
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/incount", postData, headers, "POST").subscribe(data => {
     // console.log("Qr Code Check:" + JSON.stringify(data));
    this.inCount=data.cnt;
    
    });
    
  }
  checkToBeginTrasaction(mode) {
    var requestBody = { "qrcode": this.scannedText, "vehicle_no": this.vehicleNo, "mode": this.kioskMode, "db_name": "newbr_sample" };
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/qrcodecheck", postData, headers, "POST").subscribe(data => {
    //  console.log("Qr Code Check:" + JSON.stringify(data));
      this.renderButton(data, mode);
      this.changeDetectorRef.detectChanges();
    });
  }

  renderButton(data, mode) {
    this.transactionStatus = data.status;
    this.vehicleNo = data.vehicle_no;
    this.changeDetectorRef.detectChanges();
    this.transactionId = data.id;
    this.transactionTransId = data.trans_id;
    //this.vehicleType = data.vehicle_type;
    this.changeDetectorRef.detectChanges();
    this.transact(mode);
  }

  transact(mode) {
    console.log("calling transact() method " + this.transactionStatus);
    if (mode == "in" && this.transactionStatus == "start") {
      this.isDone=false;
      this.changeDetectorRef.detectChanges();
      this.startCharge();
    } else if (mode == "out" && this.transactionStatus == "end") {
      this.isDone=true;
      this.changeDetectorRef.detectChanges();
      this.endCharge();
    }else if(mode == "in" && this.transactionStatus == "end"){
      this.changeDetectorRef.detectChanges();
      this.presentWarning("This Card/Vehicl Number Already IN");
    }else if(mode == "out" && this.transactionStatus == "start"){
      this.changeDetectorRef.detectChanges();
      this.presentWarning("This Card/Vehicl Number IN Not Found");
    } 
    else {
      this.changeDetectorRef.detectChanges();
      this.presentWarning(this.transactionStatus);
    }
    console.log("calling transact() method");
  }

  startCharge() {
    var requestBody = { "vehicle_type": this.vehicleType, "card_type": this.cardType, "qrcode": this.scannedText, vehicle_no: this.vehicleNo, mode: this.kioskMode, "is_helmet":this.is_helmet,"is_keys":this.is_keys,"db_name": "newbr_sample" }
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/startcharge", postData, headers, "POST").subscribe(data => {
      console.log("Qr Code Check:" + data.status);
      this.presentAlert("In");
      this.transactionStatus = undefined;
      this.changeDetectorRef.detectChanges();
    });
  }

  endCharge() {
    var requestBody = { "id": this.transactionId, "trans_id": this.transactionTransId, "qrcode": this.scannedText, vehicle_no: this.vehicleNo, mode: this.kioskMode, "db_name": "newbr_sample" };
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/endcharge", postData, headers, "POST").subscribe(data => {
      console.log("Qr Code Check:" + data);      
      this.transactionStatus = undefined;
      this.vehicleType=data.vehicle_type;
      this.price=data.price;
      this.transStartTime=data.start_time;
      this.duration=data.duration;
      this.changeDetectorRef.detectChanges();
      this.presentAlert("Out");
    });
  }

  getVehicleType(type) {
    return this.appUtils.getVehicleType(type);
  }

  getCardType(type) {
    return this.appUtils.getCardType(type);
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
    this.isCameraOn = false;
    this.offLight();
  }

  async presentAlert(mode) {
    let message = "";
    message += "<p><b>Check" + mode + " Time:</b>" + new Date().toLocaleString() + "</p>";
    message += "<p><b>Vehicle No:</b>" + this.vehicleNo + "</p>";
    message += "<p><b>Vehicle Type:</b>" + this.getVehicleType(this.vehicleType) + "</p>";
    if(mode=="Out"){
      message += "<p><b>Price:</b>" + this.price + "</p>";
      message += "<p><b>Duration:</b>" + this.duration + "</p>";
      console.log("In check=="+this.transStartTime);
      message += "<p><b>Check In Time:</b>" + this.transStartTime + "</p>";
      this.inCount--;
    }else{
      message += "<p style='color:green;'><b>CheckIn is success</b></p>";
      this.inCount++;
    }    
    let alert = await this.alertCtrl.create({
      cssClass: "success-alert",
     // header: "TSRTC - Parking Stand",
      header: "MGBS Bus Stand - Hyderabad",
      message: message,
      buttons: ['Close']
    });
    this.reset();
    this.is_helmet=false;
    this.is_keys=false;
    this.changeDetectorRef.detectChanges();
    this.playSingle();
    await alert.present();
  }


  onSegChange(e) {
    console.log("onStatusChange=" + e.detail.value);
    this.cardmode = e.detail.value;
  }

  async presentWarning(error) {
    let alert = await this.alertCtrl.create({
      cssClass: 'warn-alert',
      //header: "TSRTC - Parking Stand",
      header: "MGBS Bus Stand - Hyderabad",
      message: error,
      buttons: ['Close']
    });    
    await alert.present();
  }
  toggleFlash() {
    if (!this.isOn) {
      this.qrScanner.enableLight()
        .then((status: QRScannerStatus) => {
          this.isOn = true;
        })
        .catch((err) => {
          console.log("Enable Light:" + err);
        });
    } else {
      this.offLight();
    }
  }

  offLight() {
    this.qrScanner.disableLight()
      .then((status: QRScannerStatus) => {
        this.isOn = false;
      })
      .catch((err) => {
        console.log("Enable Light:" + err);
      });
  }
  visitsin(){
   // alert('In Visits In');
    this.rows=[];
    this.columns=[{prop:'vehicle_no'},{prop:'start_time'},{prop:'price'}];
    this.loadLastVIns();
    
    return false;
  }
  visitsout(){
  // alert('In Visits In');
   this.rows=[];
    this.columns=[{prop:'vehicle_no'},{prop:'duration'},{prop:'price'}];
    this.loadLastVOuts();
    return false;
  }
  loadLastVIns() {
    let req = { db_name: "newbr_sample" };
    var requestBody = req;
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/lastvins", postData, headers, "POST")
      .subscribe(data => {
        
        this.rows=data.data;
        this.changeDetectorRef.detectChanges();
     //   console.log("Data in is "+JSON.stringify(this.rows));
      });
  }
  loadLastVOuts() {
    let req = { db_name: "newbr_sample" };
    var requestBody = req;
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/lastvouts", postData, headers, "POST")
      .subscribe(data => {
        
        this.rows=data;
        this.changeDetectorRef.detectChanges();
       // console.log("Data is "+JSON.stringify(this.rows));
      });
  }

}
