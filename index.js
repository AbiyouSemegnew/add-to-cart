import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWBgTu2KjIwMPrsoW9L3Veb6CQ2Zw2VgM",
  authDomain: "shoppingcart-1df95.firebaseapp.com",
  databaseURL:
    "https://shoppingcart-1df95-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppingcart-1df95",
  storageBucket: "shoppingcart-1df95.appspot.com",
  messagingSenderId: "8986879177",
  appId: "1:8986879177:web:f4fde26a4b8e7fa06e9918",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

/**
 Make it so that when you click the "Add to cart" button
 whatever is written in the input field you should be console logged
 */

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(shoppingListInDB, inputValue);
  // clear the input field when the button is pressed
  clearInputFieldEl();
});
onValue(shoppingListInDB, function (snapshot) {
  // only fatching items from database if snapshot exist
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    shoppingListEl.innerHTML = "";
    for (let i = 0; i < itemsArray.length; i++) {
      // append item to the shopping list
      let currentItem = itemsArray[i];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here ....";
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}
function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    // extract the exact location
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    // remove the item for the database
    remove(exactLocationOfItemInDB);
  });
  shoppingListEl.append(newEl);
}
