import { Component, OnInit } from '@angular/core';
import AppUtils from '../../utils/app.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  records: any;
  completedRecords: any;

  selectedStatus: string = "active";

  constructor(private appUtils: AppUtils, private router: Router) { }


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
        console.log("Transaction Records " + JSON.stringify(data));
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
        console.log("Completed Transaction Records " + JSON.stringify(data));
        this.completedRecords = data;
      });
  }

  scan() {
    this.router.navigateByUrl("kiosk/scan");
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

}
