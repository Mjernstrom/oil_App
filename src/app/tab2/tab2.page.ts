import { Component } from '@angular/core';
import { Tab1Page } from '../tab1/tab1.page';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public alertController: AlertController) {}

  
}
