# Ionic using Google OAuth2 Authentication

Example of API RESTful using Lumen PHP Framework with JWT and Roles.

## Getting Started

I have done all steps in:
https://ionicthemes.com/tutorials/about/ionic-google-login

That web gives instructions for many scenarios so I detail here only the ones I needed. The steps are basically the following ones:

* [STEP 1: Create a project in Firebase Google Console](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiX1d7IhpLmAhVUh9UKHRNvCpUYABAAGgJ3cw&ohost=www.google.com&cid=CAESQOD21AVmWuChnAIvGVD2YC4cr9g9y7rCwmANhhhv1vunH2Ztm03P1MoCIxq8Mpl423dgj-Aaoz6XEt5L215LAUY&sig=AOD64_083j8K_qfy43xp5PG0TnvJH6e36A&q=&ved=2ahUKEwiandbIhpLmAhX-D2MBHc9YDtUQ0Qx6BAgMEAE&adurl=)

* [STEP 2: Add your App id to config.xml]()

In my case I did it this way:

```
<widget id="com.tiburcio.googleauth" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

* [STEP 3: Create a debug certificate](https://developers.google.com/android/guides/client-auth)

* [STEP 4: Download the google-services.json file from Firebase Google Console and put it into your ionic 4 project root directory]()

* [STEP 5: Install cordova plugin to interact with Google Plus SDK](https://ionicframework.com/docs/native/google-plus)

```
ionic cordova plugin add cordova-plugin-googleplus
npm install @ionic-native/google-plus
```

* [STEP 6: Install Native Storage plugin](https://ionicframework.com/docs/native/native-storage)

```
ionic cordova plugin add cordova-plugin-nativestorage
npm install @ionic-native/native-storage
```

* [STEP 7: Code the call to do Google login]()

```
async doGoogleLogin() {
  const loading = await this.loadingController.create({
    message: 'Please wait...'
  });
  
  this.presentLoading(loading);

  this.googlePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
  })
    .then(user => {
      loading.dismiss();

      this.nativeStorage.set('google_user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
        .then(() => {
          this.router.navigate(["/user"]);
        }, error => {
          console.log(error);
        })
      loading.dismiss();
    }, err => {
      console.log(err)
      loading.dismiss();
    });
}

async presentLoading(loading) {
  return await loading.present();
}
```

* [STEP 8: Get your webClientId](https://console.developers.google.com/apis/credentials).



### Prerequisites

All you need is... some time and...
* Visual Studio Code.
* Ionic 4.
* PostMan, for the RESTFul tests.
* NodeJS, as a possible Backend API
* More hours than you first could think of...

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - The Editor used in this project
* [Lumen](https://lumen.laravel.com/) - Lumen Framework
* [MySQL Workbench](https://www.mysql.com/products/workbench/) - The Database used

## Acknowledgments

* https://ionicthemes.com/tutorials/about/ionic-google-login. Excellent tutorial explaining about Google login from Ionic 4.
* https://medium.com/enappd/implement-google-login-in-ionic-4-apps-using-firebase-57334bad0910. Other great tutorial explaining about Google login from Ionic 4.
* https://developers.google.com/android/guides/client-auth. Explains how to use the keytool to create a debug certificate.
* https://medium.com/@ripoche.b/create-a-spa-with-role-based-authentication-with-laravel-and-vue-js-ac4b260b882f. Excellent tutorial to build a role based authentication with laravel.
* https://www.getpostman.com/. Used to test the RESTFul end points of the project.
* https://gist.github.com/PurpleBooth/109311bb0361f32d87a2. A very complete template for README.md files.