import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Area } from '../area-pojo';

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.scss'],
})
export class AddareaComponent implements OnInit {

  newArea:any=Area.init();

  constructor(private modalController: ModalController) {
    
   }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'newArea': this.newArea
    });
  }
}
