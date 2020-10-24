import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  gravBailTable = {
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
    "5.000": 0.939
  };
  tubingTable = {
    "2.375\" 4.70#": 1.995,
    "2.375\" 5.95#": 1.867,
    "2.875\" 6.50#": 2.441,
    "2.875\" 8.70#": 2.259,
    "3.500\" 9.30#": 2.992,
    "3.500\" 10.20#": 2.922,
    "3.500\" 12.95#":	2.750,
    "4.000\" 9.50#": 3.548,
    "4.000\" 11.00#": 3.476,
    "4.000\" 13.40#":	3.340,
    "4.500\" 12.75#":	3.958,
    "4.500\" 13.50#":	3.920,
    "4.500\" 15.50#":	3.826
  };
  // well parameter logic
  fetchTables(gravBail) {
    /*
   for (let [key, value] of Object.entries(this.gravBailTable)) {
      if (gravBail.valueof() == key.valueOf()){
        return this.gravBailTable[key]
      } else {
        return "shit"
      }
    }
    */
  };
  // Enter height of cement to be placed to determine delta p

  // Enter required delta p to determine height of cement

  // DUMP BAILER RUNS / JOB TIME REQUIREMENTS

  constructor() { }
}
