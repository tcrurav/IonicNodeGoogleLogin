import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("tiburcio: app.component.ts antes de nativeStorage");
      //Here we will check if the user is already logged in
      //because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem('google_user')
        .then(data => {
          console.log("tiburcio: app.component.ts then");
          // user is previously logged and we have his data
          // we will let him access the app
          this.router.navigate(["/user"]);
          this.splashScreen.hide();
        }, error => {
          console.log("tiburcio: app.component.ts error");
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        });
      this.statusBar.styleDefault();
    });
  }

}
