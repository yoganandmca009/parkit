import { Component, OnInit } from '@angular/core';
import AppUtils from '../utils/app.utils';
import { VehicleType, PricingRule } from './pricing_rules';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.page.html',
  styleUrls: ['./pricing.page.scss'],
})
export class PricingPage implements OnInit {

  constructor(private appUtils: AppUtils,
    private activatedRoute: ActivatedRoute, private alertCtrl: AlertController) {

  }

  vehicleTypes: VehicleType[];

  ngOnInit() {
    this.getAllPriceList();
  }

  toggleGroup(vehicleType) {
    vehicleType.show = !vehicleType.show;
    console.log("vehicleType.show " + vehicleType.show);
  }

  isGroupShown(vehicleType) {
    console.log("isGroupShown" + vehicleType.show);
    return vehicleType.show;
  }

  getIconName(vehicleType) {
    return this.isGroupShown(vehicleType) ? 'remove' : 'add';
  }

  getAllPriceList() {
    var requestBody = { "db_name": "newbr_sample" };
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/pricelist", postData, headers, "POST").subscribe(data => {
      this.vehicleTypes = data;
    });
  }

  updatePriceList(vehicleType) {
    vehicleType.db_name = "newbr_sample";
    var requestBody = vehicleType;
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } };
    var postData = "myData=" + JSON.stringify(requestBody);
    this.appUtils.callHttpApi("http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/updatepricelist", postData, headers, "POST").subscribe(data => {
      this.presentAlert("Pricing Rules saved successfully");
    });
  }

  addRule(vehicleType) {
    let ruleIndex = vehicleType.price_list ? vehicleType.price_list.length : 0;
    ruleIndex = ruleIndex + 1;
    let priceRule = new PricingRule("rule" + ruleIndex, 0, 0, 0);
    vehicleType.price_list.push(priceRule);
  }

  removeRule(vehicleType, rule) {
    let i = 0;
    vehicleType.price_list.forEach(element => {
      if (element.rule == rule.rule) {
        vehicleType.price_list.splice(i, 1);
      }
      i++;
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

  getVehicleType(type) {
    return this.appUtils.getVehicleType(type);
  }
}
