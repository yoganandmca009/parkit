import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import AppUtils from '../utils/app.utils';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-pricecheck',
  templateUrl: './pricecheck.page.html',
  styleUrls: ['./pricecheck.page.scss'],
})
export class PricecheckPage implements OnInit {
  inTime: String;
  outTime: String;
  res:String;
  vehicle_type:String;
  bluetoothList:any=[];
  selectedPrinter:any;
  constructor(private datePicker: DatePicker,private appUtils: AppUtils,private print:PrintService) { }

  ngOnInit() {
    this.listPrinter();
  }

  listPrinter() { 
    this.print.searchBluetoothPrinter()
     .then(resp=>{
 
      //List of bluetooth device list
      this.bluetoothList=resp;
  });
}
//This will store selected bluetooth device mac address
selectPrinter(macAddress)
{
  //Selected printer macAddress stored here
  this.selectedPrinter=macAddress;
}
//This will print
printStuff()
{  
   //The text that you want to print
   var myText="Hello hello hello \n\n\n This is a test \n\n\n";
   this.print.sendToBluetoothPrinter(this.selectedPrinter,myText);
   
}
printStuff1()
{  
   //The text that you want to print
   var myText="Hello hello hello \n\n\n This is a test \n\n\n";
   this.print.testPrint(this.selectedPrinter);
   
}

  filter() {
    let req = { db_name: "newbr_sample",in_time:this.inTime,out_time:this.outTime,vehicle_type:this.vehicle_type };
    
    var requestBody = req;
    
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/checkPrice", postData, headers, "POST")
      .subscribe(data => {
        this.res=data.res;
     //   this.data = data;
       // this.rows1=this.data.data;
      });
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
          this.inTime = dateTime.getFullYear() + "-" + mon + "-" +
            (dateTime.getDate()<9?"0"+dateTime.getDate():dateTime.getDate()) + " " + (dateTime.getHours()<9?"0"+dateTime.getHours():dateTime.getHours()) + ":" + (dateTime.getMinutes()<9?"0"+dateTime.getMinutes():dateTime.getMinutes()) + ":00";
        } else {
          this.outTime = dateTime.getFullYear() + "-" + mon + "-" +
          (dateTime.getDate()<9?"0"+dateTime.getDate():dateTime.getDate()) + " " + (dateTime.getHours()<9?"0"+dateTime.getHours():dateTime.getHours()) + ":" + (dateTime.getMinutes()<9?"0"+dateTime.getMinutes():dateTime.getMinutes()) + ":00";
        }
      },
      err => console.log('Error occurred while getting dateTime: ', err)
    );
  }

}
