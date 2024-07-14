import {FirebaseApp, getApp, getApps, initializeApp} from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCI4uutmSk0P55T6nAgzTmUyocURIHaz_8",
    authDomain: "laravel-react-2fa.firebaseapp.com",
    projectId: "laravel-react-2fa",
    storageBucket: "laravel-react-2fa.appspot.com",
    messagingSenderId: "786109662955",
    appId: "1:786109662955:web:da53b196e5778ad9dbe0ae",
    measurementId: "G-BE40XQVS0L"
};

let app: FirebaseApp;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
}else {
    app = getApp();
}

export { app }
