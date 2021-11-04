import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import EscPosEncoder from 'esc-pos-encoder-ionic';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(public btSerial:BluetoothSerial,private alertCtrl: AlertController) { }


  searchBluetoothPrinter()
  {
  //This will return a list of bluetooth devices
     return this.btSerial.list(); 
  }
  connectToBluetoothPrinter(macAddress)
  {
  //This will connect to bluetooth printer via the mac address provided
     return this.btSerial.connect(macAddress)
  }
  disconnectBluetoothPrinter()
  {
  //This will disconnect the current bluetooth connection
     return this.btSerial.disconnect();
  }
  //macAddress->the device's mac address 
  //data_string-> string to be printer
  sendToBluetoothPrinter(macAddress,data_string)
  {
   const encoder = new EscPosEncoder();
   const result = encoder.initialize();
   result
      .align('center')
      .newline()
      .line('Congratulation, print success')
      .line('Bluetooth MAC : ' + macAddress)
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .cut();

    const resultByte = result.encode();
     //1. Try connecting to bluetooth printer
     this.connectToBluetoothPrinter(macAddress)
     .subscribe(_=>{
        //2. Connected successfully
        this.btSerial.write(resultByte)
        .then(_=>{
         //3. Print successful
         //If you want to tell user print is successful,
         //handle it here
         //4. IMPORTANT! Disconnect bluetooth after printing
         this.disconnectBluetoothPrinter()
         },err=>{
           //If there is an error printing to bluetooth printer
           //handle it here
         })
     },err=>{
       
       //If there is an error connecting to bluetooth printer
       //handle it here
     })
  }


  testPrint(address)
  {
    let printData="Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n"

    
    let xyz=this.connectToBluetoothPrinter(address).subscribe(data=>{
      this.btSerial.write(printData).then(async dataz=>{
        console.log("WRITE SUCCESS",dataz);


        let mno= await this.alertCtrl.create({
         header:"Print SUCCESS!",
          buttons:['Dismiss']
        });
        await mno.present();

        xyz.unsubscribe();
      },async errx=>{
        console.log("WRITE FAILED",errx);
        let mno=await this.alertCtrl.create({
         header:"ERROR "+errx,
          buttons:['Dismiss']
        });
       await mno.present();
      });
      },async err=>{
        console.log("CONNECTION ERROR",err);
        let mno= await this.alertCtrl.create({
         header:"ERROR "+err,
          buttons:['Dismiss']
        });
        await mno.present();
      });

  }



}
