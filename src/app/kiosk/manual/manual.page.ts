import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import AppUtils from '../../utils/app.utils';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  transactionStatus: string;
  transactionId: string;
  transactionTransId: string;
  vehicleType: string = "---";
  cardType: string = "---";
  scannedText: string = "---";
  vehicleNo: string;

  price: string = "0";
  duration: string = "0H0M";

  isDone: boolean = false;

  outVehicleNo: string;

  lVehicleNo: string;


  constructor(private appUtils: AppUtils,
    private changeDetectorRef: ChangeDetectorRef, private toastController: ToastController,
    private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  check(mode) {    
    this.lVehicleNo = (mode == "out") ? this.outVehicleNo : this.vehicleNo;
    if (this.lVehicleNo && this.lVehicleNo.trim().length > 0) {
      this.checkToBeginTrasaction(mode);
    } else {
      console.log("Vehicle no is mandatory");      
      this.presentWarning("Vehicle no is mandatory");
    }
  }

  checkToBeginTrasaction(mode) {
    var requestBody = { "qrcode": this.scannedText, "vehicle_no": this.lVehicleNo, "mode": "manual", "db_name": "newbr_sample" };
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/qrcodecheck", postData, headers, "POST").subscribe(data => {
      console.log("Qr Code Check:" + JSON.stringify(data));
      this.renderButton(data, mode);
      this.changeDetectorRef.detectChanges();
    });
  }

  renderButton(data, mode) {
    this.transactionStatus = data.status;    
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
      this.isDone = false;
      this.changeDetectorRef.detectChanges();
      this.startCharge();
    } else if (mode == "out" && this.transactionStatus == "end") {
      this.changeDetectorRef.detectChanges();
      this.isDone = true;
      this.endCharge();
    } else {
      this.changeDetectorRef.detectChanges();      
      this.presentWarning("Invalid In/Out");
    }
    console.log("calling transact() method");
  }

  startCharge() {
    if (this.lVehicleNo && this.lVehicleNo.trim().length > 0) {
      var requestBody = { "vehicle_type": this.vehicleType, "card_type": this.cardType, "qrcode": this.scannedText, vehicle_no: this.lVehicleNo, mode: "manual", "db_name": "newbr_sample" }
      var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
      var postData = "myData=" + JSON.stringify(requestBody);
      this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/startcharge", postData, headers, "POST").subscribe(data => {
        console.log("Qr Code Check:" + data.status);
        this.presentAlert("In");
        this.transactionStatus = undefined;
        this.changeDetectorRef.detectChanges();
      });
    } else {
      console.log("Vehicle no is mandatory");
      this.presentWarning("Vehicle no is mandatory");
    }
  }

  endCharge() {
    var requestBody = { "id": this.transactionId, "trans_id": this.transactionTransId, "qrcode": this.scannedText, vehicle_no: this.lVehicleNo, mode: "manual", "db_name": "newbr_sample" };
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/endcharge", postData, headers, "POST").subscribe(data => {
      console.log("Qr Code Check:" + data);
      this.transactionStatus = undefined;
      this.vehicleType = data.vehicle_type;
      this.price = data.price;
      this.duration = data.duration;
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
    this.vehicleNo="";
    this.outVehicleNo="";
  }

  async presentAlert(mode) {
    let message = "";
    message += "<p><b>Check" + mode + " Time:</b>" + new Date().toLocaleString() + "</p>";
    message += "<p><b>Vehicle No:</b>" + this.lVehicleNo + "</p>";
    message += "<p><b>Vehicle Type:</b>" + this.getVehicleType(this.vehicleType) + "</p>";
    if(mode=="Out"){
      message += "<p><b>Price:</b>" + this.price + "</p>";
      message += "<p><b>Duration:</b>" + this.duration + "</p>";
    }else{
      message += "<p style='color:green;'><b>CheckIn is success</b></p>";
    }
    let alert = await this.alertCtrl.create({
      cssClass: "success-alert",
      header: "TSRTC - Parking Stand",
      subHeader: "MGBS Bus Stand - Hyderabad",
      message: message,
      buttons: ['Close']
    });
    this.reset();
    await alert.present();
  }

  async presentWarning(error) {
    let alert = await this.alertCtrl.create({
      cssClass: 'warn-alert',
      header: "TSRTC - Parking Stand",
      subHeader: "MGBS Bus Stand - Hyderabad",
      message: "<p style='color:red;'>"+error+"</p>",
      buttons: ['Close']
    });    
    await alert.present();
  }
}
