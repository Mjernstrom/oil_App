import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  async redirect() {
    this.route.navigate(['dumpBailHeight']);
  }
}
