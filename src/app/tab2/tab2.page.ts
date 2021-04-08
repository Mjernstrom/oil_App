import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tubingFillHeight$;
  public tubingFillHeight;
  public tubingID$;
  public tubingID;
  public tubingCapacity$;
  public tubingCapacity;
  public casingID$;
  public casingID;
  public casingCapacity$;
  public casingCapacity;
  public totalBailerVol$;
  public totalBailerVol;
  public casingFillHeight$;
  public casingFillHeight;
  public cementPlugDelta$;
  public cementPlugDelta;
  public cementHeightRequired$;
  public cementHeightRequired;
  public cementVolReq$;
  public cementVolReq;
  public cementDumped$;
  public cementDumped;
  public totalBailerRuns$;
  public totalBailerRuns;
  public cementHeight$;
  public cementHeight;
  public operatingTimeHours$;
  public operatingTimeHours;
  public operatingTimeMins$;
  public operatingTimeMins;
  public perRunTimeHours$;
  public perRunTimeHours;
  public perRunTimeMins$;
  public perRunTimeMins;
  public bailingRunTimeHours$;
  public bailingRunTimeHours;
  public bailingRunTimeMins$;
  public bailingRunTimeMins;

  
  constructor(private storage: Storage) {
  }
  ionViewWillEnter() {
      this.tubingFillHeight$ = this.storage.get('tubingFillHeight');
      this.tubingFillHeight$.then(val => this.tubingFillHeight = val);
      this.tubingID$ = this.storage.get('tubingID');
      this.tubingID$.then(val => this.tubingID = val);
      this.tubingCapacity$ = this.storage.get('tubingCapacity');
      this.tubingCapacity$.then(val => this.tubingCapacity = val);
      this.casingID$ = this.storage.get('casingID');
      this.casingID$.then(val => this.casingID = val);
      this.casingCapacity$ = this.storage.get('casingCapacity');
      this.casingCapacity$.then(val => this.casingCapacity = val);
      this.totalBailerVol$ = this.storage.get('totalBailerVol');
      this.totalBailerVol$.then(val => this.totalBailerVol = val);
      this.casingFillHeight$ = this.storage.get('casingFillHeight');
      this.casingFillHeight$.then(val => this.casingFillHeight = val);
      this.cementPlugDelta$ = this.storage.get('cementPlugDelta');
      this.cementPlugDelta$.then(val => this.cementPlugDelta = val);
      this.cementHeightRequired$ = this.storage.get('cementHeightRequired');
      this.cementHeightRequired$.then(val => this.cementHeightRequired = val);
      this.cementVolReq$ = this.storage.get('cementVolRequired');
      this.cementVolReq$.then(val => this.cementVolReq = val);
      this.cementDumped$ = this.storage.get('cementDumped');
      this.cementDumped$.then(val => this.cementDumped = val);
      this.totalBailerRuns$ = this.storage.get('totalBailerRuns');
      this.totalBailerRuns$.then(val => this.totalBailerRuns = val);
      this.cementHeight$ = this.storage.get('cementHeight');
      this.cementHeight$.then(val => this.cementHeight = val);
      this.operatingTimeHours$ = this.storage.get('operatingTimeHours');
      this.operatingTimeHours$.then(val => this.operatingTimeHours = val);
      this.operatingTimeMins$ = this.storage.get('operatingTimeMins');
      this.operatingTimeMins$.then(val => this.operatingTimeMins = val);
      this.perRunTimeHours$ = this.storage.get('perRunTimeHours');
      this.perRunTimeHours$.then(val => this.perRunTimeHours = val);
      this.perRunTimeMins$ = this.storage.get('perRunTimeMins');
      this.perRunTimeMins$.then(val => this.perRunTimeMins = val);
      this.bailingRunTimeHours$ = this.storage.get('bailingRunTimeHours');
      this.bailingRunTimeHours$.then(val => this.bailingRunTimeHours = val);
      this.bailingRunTimeMins$ = this.storage.get('bailingRunTimeMins');
      this.bailingRunTimeMins$.then(val => this.bailingRunTimeMins = val);
    }
}
