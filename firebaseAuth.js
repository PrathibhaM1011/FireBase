import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider,  signInWithPopup  } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js'
import { getFirestore, setDoc, doc } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js'


// Initialization
const firebaseConfig = {
    apiKey: "AIzaSyCuekxnXZTzMyntyS4vT4CVQgZz4PfRsQ0",
    authDomain: "logi-sign.firebaseapp.com",
    projectId: "logi-sign",
    storageBucket: "logi-sign.firebasestorage.app",
    messagingSenderId: "266014109011",
    appId: "1:266014109011:web:91e0b8feea1e9269cc45a6"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const dataBase = getFirestore();

  const signUp = document.getElementById("submitSignUp");


  signUp.addEventListener("click", (event)=>{
       event.preventDefault(); 


        const remail = document.getElementById("rEmail").value;
        const rpassword = document.getElementById("rPassword").value;
        const firstName = document.getElementById("fName").value;
        const lastName = document.getElementById("lName").value;

 

  createUserWithEmailAndPassword(auth, remail, rpassword)
  .then((userCredential) => {
   
    const user = userCredential.user;
    const userData = {
        email : remail,
        firstName : firstName,
        lastName : lastName,
        
    };
    alert("Account created");


const docRef = doc(dataBase, "users", user.uid);

setDoc(docRef, userData).then(()=>{
    window.location.href="./firebase.html"


}).catch((err)=>{
    console.error("getting error in writing document" , err)
})

}
    
 ).catch((err) => {
    const errorMsg = err.code
    if(errorMsg == "auth/email-already-in-use"){
        alert("email already exists")
    }
    else{
        alert("unable to create your account please try again")
    }
    
  });
});

//signin

const signIn = document.getElementById("submitSignIn");

signIn.addEventListener("click", (event)=>{
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((user)=>{
        alert("Welcome Back " + " "+user?.user.email);
        
    }).catch((err)=>{
        console.error(err)
    })
});

// Forgot Password Function
document.getElementById("forgotPassword").addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("rEmail").value;

    if (!email) {
        alert("Please enter your email to reset the password.");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset link sent! Please check your email.");
        })
        .catch((err) => {
            console.error(err);
            if (err.code === "auth/user-not-found") {
                alert("No account found with this email.");
            } else {
                alert("Error sending password reset email. Try again.");
            }
        });
});  



// **Google Sign-In**
document.getElementById("googleIcon").addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const userData = {
                email: user.email,
                name: user.displayName,
                profilePicture: user.photoURL
            };

            return setDoc(doc(dataBase, "users", user.uid), userData, { merge: true });
        })
        .then(() => {
            alert("Google Sign-In successful!");
            window.location.href = "./firebase.html"; // Redirect after successful login
        })
        .catch((err) => {
            console.error("Google Sign-In Error: ", err);
        });
});

// **Facebook Sign-In**
document.getElementById("fbIcon").addEventListener("click", () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const userData = {
                email: user.email,
                name: user.displayName,
                profilePicture: user.photoURL
            };

            return setDoc(doc(dataBase, "users", user.uid), userData, { merge: true });
        })
        .then(() => {
            alert("Facebook Sign-In successful!");
            window.location.href = "./firebase.html"; // Redirect after successful login
        })
        .catch((err) => {
            console.error("Facebook Sign-In Error: ", err);
        });
});


  
