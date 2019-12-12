import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ApiService } from 'src/app/services/api.service';
//import { OAuth2Data } from 'src/app/models/oauth2data';
import { WEB_CLIENT_ID } from 'src/environments/environment';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private nativeStorage: NativeStorage,
    private googlePlus: GooglePlus,
    private api: ApiService,
    
    // private route: ActivatedRoute,
    // private formBuilder: FormBuilder,
    // private authService: AuthService,
    // private alertController: AlertController
    ) {
    console.log("tiburcio: LoginPAge");
  }

  submitted = false;
  // authForm: FormGroup;
  returnUrl: string;
  loading = false;

  // constructor(private router: Router,
  //   ) {
  //   this.router.navigate(['/']);
  // }

  ngOnInit() {
  //   this.authForm = this.formBuilder.group({
  //     email: ['dragan.gaic@gmail.com', [Validators.required, Validators.email]],
  //     password: ['passw0rd', [Validators.required, Validators.minLength(6)]]
    // }, {});
  }

  //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  // }

  // onSubmit(value: any): void {
  //   this.submitted = true;

  //   // Stop if the form validation has failed
  //   if (this.authForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   this.authService.login(this.frm.email.value, this.frm.password.value)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.loading = false;
  //         this.router.navigate([this.returnUrl]);
  //       },
  //       error => {
  //         this.presentAlert(error.error.message);
  //         this.loading = false;
  //       });
  // }

  // onReset() {
  //   this.submitted = false;
  //   this.authForm.reset();
  // }

  // async presentAlert(msg) {
  //   const alert = await this.alertController.create({
  //     header: 'Alert',
  //     subHeader: '',
  //     message: msg,
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

  // get frm() { return this.authForm.controls; }

  async doGoogleLogin() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });

    this.presentLoading(loading);

    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      //'webClientId': '123413712345-abcdabcdabcdabcdabcdfancvrc1abcd.apps.googleusercontent.com', //Fake Example
      'webClientId': WEB_CLIENT_ID,
      'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    })
      .then(user => {
        console.log("tiburcio: " + JSON.stringify(user));

        loading.dismiss();

        this.nativeStorage.setItem('google_user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        }).then(() => {
          console.log("tiburcio: login nativestorage después de then");

          // let item: OAuth2Data = {
          //   userId: user.userId,
          //   accessToken: user.accessToken
          // }

          // this.api.register(item).subscribe(() => {
            this.router.navigate(["/user"]);
          // }, error => {
          //   console.log("tiburcio: register error");
          //   console.log(error);
          // });

        }, error => {
          console.log("tiburcio: login nativestorage después de error");
          console.log(error);
        });

        loading.dismiss();

      }, err => {
        console.log("tiburcio: login error al hacer login ");
        console.log(err)
        loading.dismiss();
      });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
