import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.page.html',
  styleUrls: ['./generate.page.scss'],
})
export class GeneratePage implements OnInit {

  @Input() card_request_id: number;

  allCards:any=[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllCards();
  }

  getAllCards(){
    var requestBody = { db_name: "", card_request_id: 0 };
    requestBody.db_name = "newbr_sample";
    requestBody.card_request_id = this.card_request_id;
    var postData = "myData=" + JSON.stringify(requestBody);
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } }
    this.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/getqrcardsbyseriesid", postData, headers, "POST", function (data, _this) {
      _this.allCards=data;
      console.log("Data "+_this.allCards);
    });
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
