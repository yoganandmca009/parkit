import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardRequest } from '../card-request-pojo';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  request:CardRequest=CardRequest.init();

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'request': this.request
    });
  }

}
