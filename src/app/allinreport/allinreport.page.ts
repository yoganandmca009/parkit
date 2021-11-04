import { Component, OnInit } from '@angular/core';
import AppUtils from '../utils/app.utils';

@Component({
  selector: 'app-allinreport',
  templateUrl: './allinreport.page.html',
  styleUrls: ['./allinreport.page.scss'],
})
export class AllinreportPage implements OnInit {

  constructor(private appUtils: AppUtils) { }
  rows:any;
  columns:any;
  allInData: any = { total_amount: 0, total_records: 0 }; 
  ngOnInit() {
    this.columns=[{prop:'vehicle_no'},{prop:'vehicle_type'},{prop:'insert_time'},{prop:'price'}];
    this.loadAllIns();
  }
  loadAllIns() {
    let req = { db_name: "newbr_sample" };
    var requestBody = req;
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/allinreport", postData, headers, "POST")
      .subscribe(data => {
        this.allInData = data;
        //console.log("Data=="+JSON.stringify(data));
        this.rows=this.allInData.data;
      });
  }
}
