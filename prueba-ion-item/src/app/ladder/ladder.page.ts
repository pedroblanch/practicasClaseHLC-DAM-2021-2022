import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.page.html',
  styleUrls: ['./ladder.page.scss'],
})
export class LadderPage implements OnInit {

  ladder:string[];

  constructor() {
    this.ladder = [
      'Adelaide',
      'Collingwood',
      'Essendon',
      'Hawthorn',
      'Carlton',
      'Sydney',
      'Western Bulldogs',
      'West Coast',
      'Fremantle',
      'North Melbourne',
      'Richmond',
      'Greater Western Sydney',
      'St Kilda',
      'Geelong',
      'Brisbane',
      'Melbourne',
      'Port Adelaide',
      'Gold Coast'
      ];
   }

  ngOnInit() {
  }

  onRenderItems(event) {
    console.log(`Move item from ${event.detail.from} to ${event.detail.to}`);
    const draggedItem = this.ladder.splice(event.detail.from, 1)[0];
    this.ladder.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
    } 

}
