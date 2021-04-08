import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
const isEqual = require('lodash.isequal');

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  public bailSizes: Array<string>;
  public currentBailSize: string;
  public tubingOD: Array<string>;
  public currentTubingOD: string;
  public casingOD: Array<string>;
  public currentCasingOD: string;
  public gravBailTable: {};
  public results = {};
  public dropdownInputsTable: Array<string>;
  public driftID;
  public wellDeviation;
  public timeAtSurface;
  public bailerLength;
  public bht;
  public plugSettingDepth;
  public wirelineRunSpeed;
  public cementHeightDumped;
  public plugTestPressure;
  public casingODvals;
  public tubingTableVals: {};
  public displayedResults = [];

  constructor(private storage: Storage, private route: Router) {}
  // **********************************INPUT CAPTURE AND DATA PREP ***********************************
  
  // Capture values from text-box inputs
  fetchTableValues() {
    this.driftID = (<HTMLInputElement>document.getElementById("driftID")).value;
    this.wellDeviation = (<HTMLInputElement>(document.getElementById("wellDeviation"))).value;
    this.wellDeviation = parseInt(this.wellDeviation);
    this.timeAtSurface = (<HTMLInputElement>(document.getElementById("timeAtSurface"))).value;
    this.timeAtSurface = parseInt(this.timeAtSurface);
    this.bailerLength = (<HTMLInputElement>(document.getElementById("bailerLength"))).value;
    this.bht = (<HTMLInputElement>document.getElementById("bht")).value;
    this.plugSettingDepth = (<HTMLInputElement>(document.getElementById("plugSettingDepth"))).value;
    this.wirelineRunSpeed = (<HTMLInputElement>(document.getElementById("wirelineRunSpeed"))).value;
    this.cementHeightDumped = (<HTMLInputElement>(document.getElementById("cementHeightDumped"))).value;
    this.plugTestPressure = (<HTMLInputElement>(document.getElementById("plugTestPressure"))).value;
    this.parameterLogic();
  }
  // Capture values from dropdown menus
  selectChangedGravBail(selectedBailSize) {
    this.currentBailSize = selectedBailSize;
    this.dropdownInputsTable[0] = this.currentBailSize;
  }
  selectChangedTubing(selectedTubingOD) {
    this.currentTubingOD = selectedTubingOD;
    this.dropdownInputsTable[1] = this.currentTubingOD;
  }
  selectChangedCasing(selectedCasingOD) {
    this.currentCasingOD = selectedCasingOD;
    this.dropdownInputsTable[2] = this.currentCasingOD;
  }
  // ********************************** END OF INPUT CAPTURE AND DATA PREP ***********************************


  // ************************************** PARAMETER LOGIC **************************************
  parameterLogic() {
    // Set Total Bailer Volume (this.results[5])
    for (let [key, value] of Object.entries(this.gravBailTable)) {
      if (parseFloat(this.dropdownInputsTable[0]) === parseFloat(key)) {
        this.results[5] = this.gravBailTable[key] * this.bailerLength;
        this.displayedResults[5] = Number(this.results[5]).toFixed(2);
        break;
      }
    }
    // Match Tubing OD to Tubing ID (this.results[1])
    for (let [key, value] of Object.entries(this.tubingTableVals)) {
      var check = isEqual(this.dropdownInputsTable[1].trim(), key.trim());
      if (check == true) {
        this.displayedResults[1] = this.results[1] = this.tubingTableVals[key];
        break;
      } 
    } 
    // Match casing OD to casing ID (this.results[3])
    for (let i = 0; i < this.casingOD.length; i++) {
      if (this.dropdownInputsTable[2].trim() == this.casingOD[i].trim()) {
        this.displayedResults[3] = this.results[3] = this.casingODvals[i];
        break;
      }
    }
    // Set Tubing Capacity (this.results[2])
    this.results[2] = this.results[1] * this.results[1] * 0.0408;
    this.displayedResults[2] = Number(this.results[2]).toFixed(3);
    // Set Tubing fill height per bailer run (this.results[0])
    this.results[0] = this.results[5] / this.results[2];
    this.displayedResults[0] = Number(this.results[0]).toFixed(2);
    // Set Casing Capacity (this.results[4])
    this.results[4] = this.results[3] * this.results[3] * 0.0408;
    this.displayedResults[4] = Number(this.results[4]).toFixed(3);
    // Set Casing fill height per bailer run (this.results[6])
    this.results[6] = this.results[5] / this.results[4];
    this.displayedResults[6] = Number(this.results[6]).toFixed(2);
    // Option #1: get cement plug delta psi
    if (this.cementHeightDumped !== undefined) {
      if (this.wellDeviation > 69) {
          this.results[7] = (280 * this.cementHeightDumped * 24) / this.results[3];
        } else if (this.wellDeviation > 59) {
          this.results[7] = (280 * this.cementHeightDumped * 19.2) / this.results[3];
        } else if (this.wellDeviation > 29) {
          this.results[7] = (280 * this.cementHeightDumped * 14.4) / this.results[3];
        } else if (this.wellDeviation < 30) {
          this.results[7] = (280 * this.cementHeightDumped * 12) / this.results[3];
        }
        this.displayedResults[7] = Number(this.results[7]).toFixed(2);
      }
    // Option #2: get cement height required
    if (this.plugTestPressure !== undefined) {
      if (this.wellDeviation > 69) {
          this.results[8] = this.plugTestPressure * this.results[3] * 2 / 3360;
        } else if (this.wellDeviation > 59) {
          this.results[8] = this.plugTestPressure * this.results[3] * 1.6 / 3360;
        } else if (this.wellDeviation > 29) {
          this.results[8] = this.plugTestPressure * this.results[3] * 1.2 / 3360;
        } else if (this.wellDeviation < 30) {
          this.results[8] = this.plugTestPressure * this.results[3] / 3360;
        }
        this.displayedResults[8] = Number(this.results[8]).toFixed(2);
    }  
    this.displayedResults[9] = this.results[9] = this.cementHeightDumped * this.results[4];
    this.displayedResults[11] = this.results[11] = Math.ceil(this.cementHeightDumped / this.results[6]);
    this.displayedResults[10] = this.results[10] = this.results[11] * this.results[5];
    this.displayedResults[12] = this.results[12] = this.results[10] / this.results[4];

    var timeOutputMinsTotal = (this.plugSettingDepth / this.wirelineRunSpeed);
    var timeOutputHoursTotal = timeOutputMinsTotal / 60;
    var timeOutputHours = Math.floor(timeOutputHoursTotal);
    var timeOutputMins = (timeOutputHoursTotal - timeOutputHours) * 60;

    this.displayedResults[13] = this.results[13] = timeOutputHours;
    this.displayedResults[14] = this.results[14] = timeOutputMins;

    timeOutputHoursTotal = (timeOutputMinsTotal + this.timeAtSurface) / 60;
    timeOutputHours = Math.floor(timeOutputHoursTotal);
    timeOutputMins = (timeOutputHoursTotal - timeOutputHours) * 60;

    this.displayedResults[15] = this.results[15] = timeOutputHours;
    this.displayedResults[16] = this.results[16] = timeOutputMins;

    timeOutputHoursTotal = (this.plugSettingDepth / this.wirelineRunSpeed) + this.timeAtSurface;
    timeOutputHoursTotal = (this.results[11] * timeOutputHoursTotal) / 60;
    timeOutputHours = Math.floor(timeOutputHoursTotal);
    timeOutputMins = (timeOutputHoursTotal - timeOutputHours) * 60;

    this.displayedResults[17] = this.results[17] = timeOutputHours;
    this.displayedResults[18] = this.results[18] = timeOutputMins;

    // Set data in storage to be used in Tab 2
    this.storage.set('tubingFillHeight', this.displayedResults[0]);
    this.storage.set('tubingID', this.displayedResults[1]);
    this.storage.set('tubingCapacity', this.displayedResults[2]);
    this.storage.set('casingID', this.displayedResults[3]);
    this.storage.set('casingCapacity', this.displayedResults[4]);
    this.storage.set('totalBailerVol', this.displayedResults[5]);
    this.storage.set('casingFillHeight', this.displayedResults[6]);
    this.displayedResults[7] = Math.round(this.displayedResults[7]);
    this.storage.set('cementPlugDelta', this.displayedResults[7]);
    this.storage.set('cementHeightRequired', this.displayedResults[8]);
    this.displayedResults[9] = Number(this.displayedResults[9]).toFixed(2);
    this.storage.set('cementVolRequired', this.displayedResults[9]);
    this.displayedResults[10] = Number(this.displayedResults[10]).toFixed(2);
    this.storage.set('cementDumped', this.displayedResults[10]);
    this.displayedResults[11] = this.displayedResults[11];
    this.storage.set('totalBailerRuns', this.displayedResults[11]);
    this.displayedResults[12] = Number(this.displayedResults[12]).toFixed(2);
    this.storage.set('cementHeight', this.displayedResults[12]);
    this.storage.set('operatingTimeHours', this.displayedResults[13]);
    this.displayedResults[14] = Math.round(this.displayedResults[14])
    this.storage.set('operatingTimeMins', this.displayedResults[14]);
    this.storage.set('perRunTimeHours', this.displayedResults[15]);
    this.displayedResults[16] = Math.round(this.displayedResults[16])
    this.storage.set('perRunTimeMins', this.displayedResults[16]);
    this.displayedResults[18] = Math.round(this.displayedResults[18]);
    this.storage.set('bailingRunTimeHours', this.displayedResults[17]);
    this.storage.set('bailingRunTimeMins', this.displayedResults[18]);
    this.route.navigate(['/dumpBailHeight/tab2']);
  }

  // ************************************** END PARAMETER LOGIC **************************************


  // ***************************** list of paramaters and dictionaries of tables *****************************
  ngOnInit() {
    // list to store results used in calculations (not rounded, not displayed)
    this.results = [
      /* 0 Tubing Fill Height per Bailer Run (ft): */ 0,
      /* 1 Tubing ID (in): */ 0,
      /* 2 Tubing Capacity (US Gal/ft)": */ 0,
      /* 3 Casing ID (in)": */ 0,
      /* 4 Casing Capacity (US Gal/ft)": */ 0,
      /* 5 Total Bailer Volume (US Gal/ft)": */ 0,
      /* 6 Casing Fill Height per Bailer Run (ft)": */ 0,
      /* 7 Cement Plug ΔP (psi)": */ 0,
      /* 8 Cement Height Required (ft)": */ 0,
      /* 9 Cement Volume Required (Gals)": */ 0,
      /* 10 Cement Dumped (If full Bailer)(Gals)": */ 0,
      /* 11 Total Bailer Runs Required": */ 0,
      /* 12 Cement Height (If full Bailers used)": */ 0,
      /* 13 Inhole Per Run Operating Time Hours": */ 0,
      /* 14 Inhole Per Run Operating Time Mins": */ 0,
      /* 15 Total Per Run Round Trip Time Hours": */ 0,
      /* 16 Total Per Run Round Trip Time Mins": */ 0,
      /* 17 Total Bailing Round Trip Time Hours": */ 0,
      /* 18 Total Bailing Round Trip Time Mins": */ 0,
    ];
    // list used to store rounded values to be displayed. Same as list above, except its rounded 
    this.displayedResults = [
      /* 0 Tubing Fill Height per Bailer Run (ft): */ 0,
      /* 1 Tubing ID (in): */ 0,
      /* 2 Tubing Capacity (US Gal/ft)": */ 0,
      /* 3 Casing ID (in)": */ 0,
      /* 4 Casing Capacity (US Gal/ft)": */ 0,
      /* 5 Total Bailer Volume (US Gal/ft)": */ 0,
      /* 6 Casing Fill Height per Bailer Run (ft)": */ 0,
      /* 7 Cement Plug ΔP (psi)": */ 0,
      /* 8 Cement Height Required (ft)": */ 0,
      /* 9 Cement Volume Required (Gals)": */ 0,
      /* 10 Cement Dumped (If full Bailer)(Gals)": */ 0,
      /* 11 Total Bailer Runs Required": */ 0,
      /* 12 Cement Height (If full Bailers used)": */ 0,
      /* 13 Inhole Per Run Operating Time Hours": */ 0,
      /* 14 Inhole Per Run Operating Time Mins": */ 0,
      /* 15 Total Per Run Round Trip Time Hours": */ 0,
      /* 16 Total Per Run Round Trip Time Mins": */ 0,
      /* 17 Total Bailing Round Trip Time Hours": */ 0,
      /* 18 Total Bailing Round Trip Time Mins": */ 0,
    ];
    // list for selected values from dropdown inputs
    this.dropdownInputsTable = [];
    // Set initial values for dropdown inputs
    this.dropdownInputsTable[0] = this.currentBailSize = "1.000";
    this.dropdownInputsTable[1] = this.currentTubingOD = '2.375" 4.70#';
    this.dropdownInputsTable[2] = this.currentCasingOD = '4.500" 9.50#';
    this.bailSizes = [
      "1.000",
      "1.375",
      "1.500",
      "1.625",
      "2.000",
      "2.125",
      "2.375",
      "2.625",
      "3.000",
      "3.500",
      "4.000",
      "5.000",
    ];
    this.gravBailTable = {
      "1.000": 0.033,
      "1.375": 0.067,
      "1.500": 0.072,
      "1.625": 0.095,
      "2.000": 0.137,
      "2.125": 0.152,
      "2.375": 0.185,
      "2.625": 0.206,
      "3.000": 0.315,
      "3.500": 0.438,
      "4.000": 0.587,
      "5.000": 0.939,
    };
    this.tubingOD = [
      '2.375" 4.70#',
      '2.375" 5.95#',
      '2.875" 6.50#',
      '2.875" 8.70#',
      '3.500" 9.30#',
      '3.500" 10.20#',
      '3.500" 12.95#',
      '4.000" 9.50#',
      '4.000" 11.00#',
      '4.000" 13.40#',
      '4.500" 12.75#',
      '4.500" 13.50#',
      '4.500" 15.50#',
    ];
    this.tubingTableVals = {
      '2.375" 4.70#': 1.995,
      '2.375" 5.95#': 1.867,
      '2.875" 6.50#': 2.441,
      '2.875" 8.70#': 2.259,
      '3.500" 9.30#': 2.992,
      '3.500" 10.20#': 2.922,
      '3.500" 12.95#': 2.750,
      '4.000" 9.50#': 3.548,
      '4.000" 11.00#': 3.476,
      '4.000" 13.40#': 3.340,
      '4.500" 12.75#': 3.958,
      '4.500" 13.50#': 3.920,
      '4.500" 15.50#': 3.826,
    };
    this.casingOD = [
      '4.500" 9.50#',
      '4.500" 10.50#',
      '4.500" 11.60#',
      '4.500" 13.50#',
      '4.500" 15.10#',
      '5.000" 13.00#',
      '5.000" 15.00#',
      '5.000" 18.00#',
      '5.000" 20.30#',
      '5.000" 23.20#',
      '5.500" 15.50#',
      '5.500" 17.00#',
      '5.500" 20.00#',
      '5.500" 23.00#',
      '5.500" 26.00#',
      '6.625" 20.00#',
      '6.625" 24.00#',
      '6.625" 28.00#',
      '6.625" 32.00#',
      '7.000" 20.00#',
      '7.000" 23.00#',
      '7.000" 26.00#',
      '7.000" 29.00#',
      '7.000" 32.00#',
      '7.000" 35.00#',
      '7.000" 38.00#',
      '7.625" 26.40#',
      '7.625" 29.70#',
      '7.625" 33.70#',
      '7.625" 39.00#',
      '7.625" 42.80#',
      '7.625" 45.30#',
      '8.625" 32.00#',
      '8.625" 36.00#',
      '8.625" 40.00#',
      '8.625" 44.00#',
      '8.625" 49.00#',
      '9.625" 40.00#',
      '9.625" 43.50#',
      '9.625" 47.00#',
      '9.625" 53.50#',
      '9.625" 58.40#',
      '10.750" 40.50#',
      '10.750" 45.50#',
      '10.750" 51.00#',
      '10.750" 55.50#',
      '10.750" 60.70#',
      '10.750" 65.70#',
      '10.750" 71.10#',
      '10.750" 80.80#',
      '11.750" 54.00#',
      '11.750" 60.00#',
      '11.750" 65.00#',
      '11.750" 71.00#',
      '11.875" 71.80#',
      '12.750" 123.70#',
      '13.375" 54.50#',
      '13.375" 61.00#',
      '13.375" 68.00#',
      '13.375" 72.00#',
      '13.375" 80.70#',
      '13.375" 86.00#',
      '13.625" 88.20#',
      '16.000" 65.00#',
      '16.000" 75.00#',
      '16.000" 84.00#',
      '16.000" 95.00#',
      '16.000" 97.00#',
      '16.000" 109.00#',
      '16.000" 118.00#',
      '16.000" 137.90#',
      '18.625" 87.50#',
      '18.625" 94.50#',
      '18.625" 106.00#',
      '18.625" 117.50#',
      '20.000" 94.00#',
      '20.000" 106.50#',
      '20.000" 133.00#',
      '20.000" 169.00#',
    ];
    this.casingODvals = [
      4.090,
      4.052,
      4.000,
      3.920,
      3.826,
      4.494,
      4.408,
      4.276,
      4.184,
      4.044,
      4.950,
      4.892,
      4.778,
      4.670,
      4.548,
      6.049,
      5.921,
      5.791,
      5.675,
      6.456,
      6.366,
      6.276,
      6.184,
      6.094,
      6.004,
      5.920,
      6.969,
      6.875,
      6.765,
      6.625,
      6.501,
      6.435,
      7.921,
      7.825,
      7.725,
      7.625,
      7.511,
      8.835,
      8.755,
      8.681,
      8.535,
      8.435,
      10.050,
      9.950,
      9.850,
      9.760,
      9.660,
      9.560,
      9.450,
      9.250,
      10.880,
      10.772,
      10.682,
      10.586,
      10.711,
      10.782,
      12.615,
      12.515,
      12.415,
      12.347,
      12.215,
      12.125,
      12.375,
      15.250,
      15.124,
      15.010,
      14.868,
      14.850,
      14.688,
      14.570,
      14.323,
      17.755,
      17.689,
      17.563,
      17.439,
      19.124,
      19.000,
      18.730,
      18.376
    ];
  }
}
