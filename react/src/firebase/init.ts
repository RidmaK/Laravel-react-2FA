import { FirebaseApp, getApp, getApps, initializeApp } from "@firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyB7BpZJuRDBkmCzWhbfLt9wJpDohCECQKA",
//     authDomain: "fa-react-112d6.firebaseapp.com",
//     projectId: "fa-react-112d6",
//     storageBucket: "fa-react-112d6.appspot.com",
//     messagingSenderId: "453614429557",
//     appId: "1:453614429557:web:0e37386cd9faa02118df3c",
//     measurementId: "G-GS3XG3N0R1",
// };

const firebaseConfig = {
    apiKey: "AIzaSyD1ClNh2qAJO6-kwD7Am6eTja_dQBRNUyM",
    authDomain: "fa-react-1.firebaseapp.com",
    projectId: "fa-react-1",
    storageBucket: "fa-react-1.appspot.com",
    messagingSenderId: "953287494328",
    appId: "1:953287494328:web:85645460dfc0f689cac24d",
    measurementId: "G-BR68B2M05V",
};

let app: FirebaseApp;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

export { app };
