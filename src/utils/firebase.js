import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBxPDmRiw-Bs3scxFdlhOt-JShbNkMJaIE",
    authDomain: "webskitters-580d2.firebaseapp.com",
    projectId: "webskitters-580d2",
    storageBucket: "webskitters-580d2.appspot.com",
    messagingSenderId: "129186483684",
    appId: "1:129186483684:web:e292e0f5f374d2997a4bf1"
})

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider()

// export const signInWithGoogle = () => {
//     auth.signInWithPopup(googleProvider).then((res) => {
//         console.log(res.user)
//     }).catch((error) => {
//         console.log(error.message)
//     })
// }