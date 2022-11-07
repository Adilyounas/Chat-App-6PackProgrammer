import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyApMub_Q7oyFo8G8FHof3x1g5o2iytC2BU",
  authDomain: "packprogrammer-chat-app.firebaseapp.com",
  projectId: "packprogrammer-chat-app",
  storageBucket: "packprogrammer-chat-app.appspot.com",
  messagingSenderId: "45619653387",
  appId: "1:45619653387:web:5459ae6d97146dab09900e"
};

 const app = initializeApp(firebaseConfig);

 export default app;