import { Component } from '@angular/core';
//import { CalculatorService } from '../calculator.service';
import { AlertController } from "@ionic/angular";

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
  public tubingTable = {};
  public casingTable = {};
  public results = {};
  public dropdownInputsTable: Array<string>;
  public bailerLength;
  public driftID;
  public wellDeviation;
  public timeAtSurface;
  public bht;
  public plugSettingDepth;
  public wirelineRunSpeed;
  public cementHeightDumped;
  public plugTestPressure;
  //private calculatorService: CalculatorService;

  constructor(public alertController: AlertController) {}

  // *******************PARAMETER LOGIC*******************


  // Fetch corresponding table values for dropdown menu inputs
  fetchTableValues() {
    this.bailerLength = (<HTMLInputElement>document.getElementById('bailerLength')).value;
    console.log(this.bailerLength);
    // Put
    for (let [key, value] of Object.entries(this.gravBailTable)) {
      if (parseFloat(this.dropdownInputsTable[0]) === parseFloat(key)) {
        console.log(this.gravBailTable[key]);
      }
    }
  }

  // *******************END PARAMETER LOGIC*******************

  // Update results table and current selections
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

  // **********list of paramters and dictionaries of tables**********
  ngOnInit() {
    // Initiate list for results displayed on the results section
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
      /* 13 Inhole Per Run Operating Time": */ 0,
      /* 14 Total Per Run Round Trip Time": */ 0,
      /* 15 Total Bailing Round Trip Time": */ 0,
    ];
    // Initiate list for selected values from dropdown inputs
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
    // Tables
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
    this.tubingTable = {
      '2.375" 4.70#': 1.995,
      '2.375" 5.95#': 1.867,
      '2.875" 6.50#': 2.441,
      '2.875" 8.70#': 2.259,
      '3.500" 9.30#': 2.992,
      '3.500" 10.20#': 2.922,
      '3.500" 12.95#': 2.75,
      '4.000" 9.50#': 3.548,
      '4.000" 11.00#': 3.476,
      '4.000" 13.40#': 3.34,
      '4.500" 12.75#': 3.958,
      '4.500" 13.50#': 3.92,
      '4.500" 15.50#': 3.826,
    };
    this.casingTable = {};
  }
}
