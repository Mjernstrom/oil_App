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

  constructor(
      public afAuth: AngularFireAuth, 
      private route: Router, 
      private toast: ToastController
    ){}

  ngOnInit() {
  }

  async createAccount() {
    this.route.navigate(['signup']);
  }
  
  async login(){
    const { username, password }  = this;
    this.afAuth.signInWithEmailAndPassword(username, password)
      .then(user => {
          this.route.navigate(['tabs']);
      }).catch(error => {
          console.log("contact Mattjernstrom@gmail.com for credentials to gain access");
          this.presentLoginError();
      })
    }

  async presentLoginError() {
    const toast = await this.toast.create({
      message: 'Username/Password Incorrect',
      position: 'middle',
      color: 'light',
      duration: 5000
    });
    toast.present();
  }
}
