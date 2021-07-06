import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { RequestPage } from './request/request.page';
import { CardRequest } from './card-request-pojo';
import { GeneratePage } from './generate/generate.page';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  qrData = null;
  createdCode = null;
  scannedCode = null;
  modal: any;
  cardRequests: CardRequest[];
  _this = this;

  constructor(public modalController: ModalController, private http: HttpClient) {

  }

  createCode() {
    this.createdCode = this.qrData;
    console.log(this.createdCode);
  }

  loadCardSeries() {
    var req = { db_name: "newbr_sample" };
    var requesyBody = "myData=" + JSON.stringify(req);
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } }
    this.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/getqrcardsseries", requesyBody, headers, "POST", function (data, _this) {
      _this.cardRequests = data;
    });
  }

  async createCardRequest() {
    console.log("Called addArea()");
    this.modal = await this.modalController.create({
      component: RequestPage
    });
    this.modal.onWillDismiss().then((data) => {
      console.log("Data Collected:" + JSON.stringify(data.data.request));
      this.sendCardRequest(data.data.request);
    })
    return await this.modal.present();
  }

  sendCardRequest(reqBody) {
    var requestBody = "myData=" + JSON.stringify(reqBody);
    console.log("Data:" + requestBody);
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } }
    this.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/createqrcards", requestBody, headers, "POST", function (data) {
      console.log(data);
    });
  }

  ngOnInit() {
    this.loadCardSeries();
  }

  callHttpApi(url, requestBody, headers, method, successCallbakFn) {
    if (method == "POST") {
      this.http.post(url, requestBody, headers)
        .subscribe(data => {
          if (successCallbakFn)
            successCallbakFn(data, this);
        });
    } else {
      this.http.get(url, headers)
        .subscribe(data => {
          if (successCallbakFn)
            successCallbakFn(data, this);
        });
    }
  }

  async viewSeries(cardRequestId) {
    this.modal = await this.modalController.create({
      component: GeneratePage,
      componentProps: {
        'card_request_id': cardRequestId,
      }
    });
    this.modal.onWillDismiss().then((data) => {
      console.log("Data Collected:" + JSON.stringify(data.data.request));      
    })
    return await this.modal.present();
  }

  getVehicleType(type){
    switch(type){
      case "BI":
        return "Bikes";
      case "CA":
        return "Cars";
      case "ME":
        return "Medium Vehicles";
      case "HE":
        return "Heavy Vehicles";
      case "AU":
        return "Autos";
      case "CY":
        return "Cycles";
      default:
        return "NoType"
    }
  }

  getCardType(type){
    switch(type){
      case "RE":
        return "Regular";
      case "DA":
        return "Daily";
      case "PA":
        return "Pass";        
    }
  }

}
