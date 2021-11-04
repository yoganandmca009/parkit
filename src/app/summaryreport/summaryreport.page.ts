import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summaryreport',
  templateUrl: './summaryreport.page.html',
  styleUrls: ['./summaryreport.page.scss'],
})
export class SummaryreportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  startScan(val){
    alert("Test For "+val);
  }

}
