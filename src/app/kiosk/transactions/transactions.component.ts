import { Component, OnInit } from '@angular/core';
import AppUtils from '../../utils/app.utils';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  records: any;
  completedRecords: any;
  price: any;
  duration: any;


  selectedStatus: string = "active";
  _this = this;

  constructor(private appUtils: AppUtils, private router: Router,
              private alertCtrl: AlertController) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadActiveTransactions();
  }

  loadActiveTransactions() {
    var requestBody = { db_name: '' };
    requestBody.db_name = "newbr_sample";
    var postData = "myData=" + JSON.stringify(requestBody);
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } }
    this.appUtils.
      callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/qroutlist", postData, headers, "POST")
      .subscribe(data => {
        //console.log("Transaction Records " + JSON.stringify(data));
        this.records = data;
      });
  }

  loadCompletedTransactions() {
    var requestBody = { db_name: '' };
    requestBody.db_name = "newbr_sample";
    var postData = "myData=" + JSON.stringify(requestBody);
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } }
    this.appUtils.
      callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/translist", postData, headers, "POST")
      .subscribe(data => {
        //console.log("Completed Transaction Records " + JSON.stringify(data));
        this.completedRecords = data;
      });
  }
  getActiveVehiclePrice(vehicle_no) {
    var requestBody = { db_name: '',vehicle_no:'' };
    requestBody.db_name = "newbr_sample";
    requestBody.vehicle_no = vehicle_no;
    var postData = "myData=" + JSON.stringify(requestBody);
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } }
    this.appUtils.
      callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/getactivevehicleprice", postData, headers, "POST")
      .subscribe(data => {
        this.duration=data.duration;
        this.price=data.price;
        //console.log("Out Data is  " + JSON.stringify(data)+"=="+this.duration);
        //this.completedRecords = data;
      });
  }

  scan() {
    this.router.navigateByUrl("kiosk/scan");
  }
  manual() {
    this.router.navigateByUrl("kiosk/manual");
  }

  onStatusChange(e) {
    console.log("onStatusChange=" + e.detail.value);
    if (e.detail.value == "active") {
      this.selectedStatus = e.detail.value;
      this.loadActiveTransactions();
    } else {
      this.selectedStatus = e.detail.value;
      this.loadCompletedTransactions();
    }
  }

  getVehicleImage(type) {
    return this.appUtils.getVehicleImageLink(type);
  }

  viewRecord(rec,type){
 // console.log("Type=="+type);
    if(type=="a"){
    //  console.log("In TYpe==");
this.getActiveVehiclePrice(rec.vehicle_no);
//console.log("In TYpe==");
rec.duration=this.duration;
rec.price=this.price;
    }
    let message = "<p><b>Vehicle No:</b>" + rec.vehicle_no + "</p>";
    message += "<p><b>Vehicle Type:</b>" + this.appUtils.getVehicleType(rec.vehicle_type) + "</p>";
    message += "<p><b>Price:</b>" + rec.price + "</p>";
    message += "<p><b>Duration:</b>" + rec.duration + "</p>";
    this.presentAlert(message);
  }

  async presentAlert(message) {    
    
    let alert = await this.alertCtrl.create({
      //header: "TSRTC - Parking Stand",
      header: "MGBS Bus Stand - Hyderabad",
      message: message,
      buttons: ['Close']
    });        
    await alert.present();
  }

}
