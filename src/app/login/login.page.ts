import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterOutlet } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";
  isToastActive = false;

  constructor(
      private afAuth: AngularFireAuth, 
      private route: Router, 
      private toast: ToastController
    ) {}

  ngOnInit() {
  }

  async createAccount() {
    if (this.isToastActive == true) {
      this.toast.dismiss();
      this.isToastActive = false;
    }
    this.route.navigate(['signup']);
  }
  
  async login(){
    const { username, password }  = this;
    this.afAuth.signInWithEmailAndPassword(username, password)
      .then(user => {
          this.route.navigate(['directory']);
      }).catch(error => {
          this.presentLoginError();
      })
    }

  async presentLoginError() {
    const toast = await this.toast.create({
      cssClass: 'loginError',
      message: 'Username/Password Incorrect',
      position: 'middle',
      color: 'light',
      duration: 4000,
    });
    this.isToastActive = true;
    toast.present();
  }
}
