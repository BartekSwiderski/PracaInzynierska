// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// import {
//   getDatabase,
//   ref,
//   child,
//   get,
//   set,
//   equalTo,
//   orderByChild,
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyD8_28psQOyaITWkP0aysC6BjQpaB0oUwY",
//   authDomain: "pracainzynierskafilmoteka.firebaseapp.com",
//   projectId: "pracainzynierskafilmoteka",
//   storageBucket: "pracainzynierskafilmoteka.appspot.com",
//   databaseURL:
//     "https://pracainzynierskafilmoteka-default-rtdb.europe-west1.firebasedatabase.app/",
//   messagingSenderId: "320698596068",
//   appId: "1:320698596068:web:3196894f91f63459644af1",
//   measurementId: "G-QK7NVC0YY7",
// };
// const app = initializeApp(firebaseConfig);

// const auth = getAuth();
// const provider = new GoogleAuthProvider();
// const signInBtn = document.getElementById("signIn");
// const signOutBtn = document.getElementById("signOut");
// const messageShow = document.getElementById("Message");
// const displayName = document.getElementById("displayName");

// let guid = "";
// let name = "";
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     if (
//       document.location.pathname === "/index.html" ||
//       document.location.pathname.indexOf > -1
//     ) {
//       signOutBtn.style.display = "inline";
//       messageShow.style.display = "inline";
//       signInBtn.style.display = "none";
//       let Name = user.displayName;
//       displayName.innerHTML = user.displayName;
//     }
//     guid = user.uid;
//     name = user.displayName;
//   } else {
//     if (
//       document.location.pathname === "/index.html" ||
//       document.location.pathname.indexOf > -1
//     ) {
//       signOutBtn.style.display = "none";
//       messageShow.style.display = "none";
//       signInBtn.style.display = "inline";
//     }
//   }
// });

// if (
//   document.location.pathname === "/index.html" ||
//   document.location.pathname.indexOf > -1
// ) {
//   signOutBtn.style.display = "none";
//   messageShow.style.display = "none";

//   const userSignIn = async () => {
//     signInWithPopup(auth, provider);
//     console
//       .log("Zalogowany")
//       .then((result) => {})
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMesage = error.message;
//       });
//   };

//   const userSignOut = async () => {
//     signOut(auth);
//     guid = null;
//     name = "";
//     console
//       .log(guid)
//       .then(() => {})
//       .catch((error) => {});
//   };
//   signInBtn.addEventListener("click", userSignIn);
//   signOutBtn.addEventListener("click", userSignOut);
// }
// const db = getDatabase();

// function AddData(key, id, uid) {
//   console.log(uid);
//   if (guid !== null) {
//     set(ref(db, `${uid}/${id}`), { ID: key }).then(() => {
//       info(`Movie add to ${key}`);
//     });
//   } else {
//     alert("You are not login");
//   }
// }
// const dbRef = ref(getDatabase());
// let UserData = [];
// function GetData(uid, key) {
//   get(child(dbRef, `${uid}`), orderByChild("ID"), equalTo(`${key}`, `ID`)).then(
//     (snapshot) => {
//       if (snapshot.exists()) {
//         let object = snapshot.val();
//         let arrayOfObject = Object.entries(object);
//         UserData = [];
//         for (let i = 0; i < arrayOfObject.length; i++)
//           if (arrayOfObject[i][1].ID === key) {
//             UserData.push(arrayOfObject[i][0]);
//             console.log(arrayOfObject[i][1].ID);
//             console.log(UserData);
//           }
//         return UserData;
//       }
//     }
//   );
// }

// export { AddData, GetData, UserData, guid, name };
