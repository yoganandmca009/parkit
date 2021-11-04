import { Component, OnInit } from '@angular/core';
import AppUtils from '../utils/app.utils';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-vehnoreport',
  templateUrl: './vehnoreport.page.html',
  styleUrls: ['./vehnoreport.page.scss'],
})
export class VehnoreportPage implements OnInit {

  vehicle_no:string="";
  rows1:any;
 columns1:any;
 selectedReport: string = "";
 
  data: any = { total_amount: 0, total_records: 0 };

  constructor(private appUtils: AppUtils) { 
    this.columns1=[{prop:'vehicle_no'},{prop:'vehicle_type'},{prop:'price'},{prop:'status'},{prop:'start_time'},{prop:'end_time'}];
  }

  ngOnInit() {
  }

  filter(){
    this.selectedReport="detail";
    console.log("No---"+this.vehicle_no)
    var reqData={};
    reqData["db_name"] = "newbr_sample";
    reqData["vno"] = this.vehicle_no;
 //   var requestBody = this.searchFilter;
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(reqData);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/vnoreport", postData, headers, "POST")
      .subscribe(data => {
        this.data = data;
        this.rows1=this.data.data;
      });
  }

}
