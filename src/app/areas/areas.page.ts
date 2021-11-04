import { Component, OnInit } from '@angular/core';
import { Area } from './area-pojo';
import { ModalController} from '@ionic/angular';
import { AddareaComponent } from './addarea/addarea.component';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage implements OnInit {

  public areas = []; 

  private modal:any;

  constructor(public modalController: ModalController) {
    this.getAllAreas();
  }

  ngOnInit() {

  }

  getAllAreas() {

    this.areas = [new Area("MGBS Bus Stand", "MGBS", "/assets/areas/mall.png", 200, 100, 50)
    
    
    ];

  }

  async addArea() {
    console.log("Called addArea()");
    this.modal = await this.modalController.create({
      component: AddareaComponent
    });
    this.modal.onWillDismiss().then((data)=>{
      console.log("Data Collected:"+JSON.stringify(data.data.newArea));
      this.areas.push(data.data.newArea);
    })    
    return await this.modal.present();
  }  

  updateArea() {

  }

  editArea(){
    console.log("Edit Area");
  }

  deleteArea() {

    console.log("Delete Area");
    
  }

}
