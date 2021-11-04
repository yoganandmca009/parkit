import { Component, OnInit } from '@angular/core';
import { SearchFilter } from './search_filter';
import AppUtils from '../utils/app.utils';
import { AlertController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
 
})
export class ReportsPage implements OnInit {

  searchFilter: SearchFilter;

  selectedReport: string = "detail";
 //rows:any;
 //columns:any;
 rows1:any;
 columns1:any;
  data: any = { total_amount: 0, total_records: 0 };

 // allInData: any = { total_amount: 0, total_records: 0 };

  constructor(private appUtils: AppUtils, private alertCtrl: AlertController,
    private datePicker: DatePicker) {
    this.searchFilter = new SearchFilter(undefined, undefined, "", "");
//    this.columns=[{prop:'vehicle_no'},{prop:'vehicle_type'},{prop:'insert_time'},{prop:'price'}];
    this.columns1=[{prop:'vehicle_no'},{prop:'vehicle_type'},{prop:'price'}];
   // this.rows=[{name:'AAAAA',summary:'DDDD',company:'TTTTTT'}]
  }


  ngOnInit() {
  }

  filter() {
    this.searchFilter.db_name = "newbr_sample";
    var requestBody = this.searchFilter;
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/detailreport", postData, headers, "POST")
      .subscribe(data => {
        this.data = data;
        this.rows1=this.data.data;
      });
  }

  async presentAlert(message) {
    let alert = await this.alertCtrl.create({
      header: "Status",
      subHeader: "SUCCESS",
      message: message,
      buttons: ['Close']
    });
    await alert.present();
  }

  showDateTimepicker(type) {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_TRADITIONAL,
      doneButtonLabel: "Select",
      is24Hour: false
    }).then(
      dateTime => {
        let mon = (dateTime.getMonth() < 9) ? "0" + (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1);
        if (type == "s") {
          this.searchFilter.start_date = dateTime.getFullYear() + "-" + mon + "-" +
            (dateTime.getDate()<9?"0"+dateTime.getDate():dateTime.getDate()) + " " + (dateTime.getHours()<9?"0"+dateTime.getHours():dateTime.getHours()) + ":" + (dateTime.getMinutes()<9?"0"+dateTime.getMinutes():dateTime.getMinutes()) + ":00";
        } else {
          this.searchFilter.end_date = dateTime.getFullYear() + "-" + mon + "-" +
          (dateTime.getDate()<9?"0"+dateTime.getDate():dateTime.getDate()) + " " + (dateTime.getHours()<9?"0"+dateTime.getHours():dateTime.getHours()) + ":" + (dateTime.getMinutes()<9?"0"+dateTime.getMinutes():dateTime.getMinutes()) + ":00";
        }
      },
      err => console.log('Error occurred while getting dateTime: ', err)
    );
  }

  getVehicleType(type) {
    return this.appUtils.getVehicleType(type);
  }

  onStatusChange(e) {
    console.log("onStatusChange=" + e.detail.value);
    if (e.detail.value == "detail") {
      this.selectedReport = e.detail.value;
    } else {
      this.selectedReport = e.detail.value;
    //  this.loadAllIns();
    }
  }

 /* loadAllIns() {
    let req = { db_name: "newbr_sample" };
    var requestBody = req;
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/allinreport", postData, headers, "POST")
      .subscribe(data => {
        this.allInData = data;
        this.rows=this.allInData.data;
      });
  }*/

}
