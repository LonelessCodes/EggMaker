import * as firebase from "firebase";
import uuid from "uuid";

const config = {
  apiKey: "AIzaSyAdvAsw1l_GvmSlakfF0gXGgZ1TkeiRPzs",
  databaseURL: "https://egg-maker-ff650.firebaseio.com",
  storageBucket: "egg-maker-ff650.appspot.com"
};
firebase.initializeApp(config);

const storage = firebase.storage().ref();
const database = firebase.database().ref();

export function getEggs() {
  return database.child("eggs")
    .once("value")
    .then(snap => {
      const files = [];
      snap.forEach(file => {
        return storage.child(file.val()).getDownloadURL();
      });
      return Promise.all(files);
    })
    .then(urls => {
      return urls.map(url => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = "blob";
        // xhr.onload = () => {
        //   const blob = xhr.response;
        // };
        // xhr.open("GET", url);
        // xhr.send();

        // // Or inserted into an <img> element:
        // var img = document.getElementById("myimg");
        // img.src = url;

        return url;
      });
    });
}

export function saveEgg(file) {
  const path = storage.child(`${uuid.v4()}.png`);
  database.child("eggs").push().set(path.name);
  return path.put(file, {
    contentType: "image/png",
  });
}