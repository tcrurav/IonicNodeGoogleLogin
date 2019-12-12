import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  data: {name: string, email: string, picture: string} = {name: '', email: '', picture: ''};

  constructor(
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    private router: Router) { }

  ngOnInit() {
    this.getDataFromNativeStorage();
  }

  getDataFromNativeStorage() {
    console.log("tiburcio: user antes de nativeStorage");
    this.nativeStorage.getItem('google_user')
      .then((data) => {
        console.log("tiburcio: user then de nativeStorage");
        this.data = data;
        console.log(data);
      }, error => {
        console.log("tiburcio: user error de nativeStorage");
        console.log(error);
      });
  }

  doGoogleLogout() {
    this.googlePlus.logout()
      .then(res => {
        //user logged out so we will remove him from the NativeStorage
        this.nativeStorage.remove('google_user');
        this.router.navigate(["/login"]);
      }, err => {
        console.log(err);
      })
  }
}
