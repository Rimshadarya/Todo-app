// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyB3FMOxGR6qLpS78WVIb_udNFgx5RpnzaM",
  authDomain: "todo-5fa54.firebaseapp.com",
  databaseURL: "https://todo-5fa54-default-rtdb.firebaseio.com",
  projectId: "todo-5fa54",
  storageBucket: "todo-5fa54.firebasestorage.app",
  messagingSenderId: "158153056321",
  appId: "1:158153056321:web:85be5f0e0d2ac9964526c0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Reference to the UL element in HTML
var ulElement = document.getElementById("list");

// Function to add a Todo item to Firebase
function addTodo() {
  var input = document.getElementById("todoInput");

  if (input.value.trim()) {
      var todoText = input.value.trim();

      // Generate a unique ID for the todo item
      var key = Date.now().toString(36); // Timestamp as the unique key

      // Save the todo item to Firebase Realtime Database
      firebase.database().ref("todos/" + key).set({
          value: todoText,
          key: key
      }).then(() => {
          console.log("Todo added to Firebase!");
          input.value = "";  // Clear the input field
      }).catch((error) => {
          console.error("Error adding todo: ", error);
      });
  } else {
      alert("Please enter a task.");
  }
}

// Function to delete all Todos from Firebase and the UI
function deleteAllItems() {
  firebase.database().ref("todos").remove();
  ulElement.innerHTML = "";  // Clear the UI
}

// Function to delete a single Todo from Firebase and the UI
function deleteSingleItem(e) {
  var li = e.parentNode;
  var todoId = li.getAttribute('data-id');

  firebase.database().ref("todos/" + todoId).remove()
      .then(() => {
          console.log("Todo deleted!");
          li.remove();
      })
      .catch((error) => {
          console.error("Error deleting todo: ", error);
      });
}

// Function to edit a Todo in Firebase
function editItem(e) {
  var li = e.parentNode;
  var inputValue = li.firstChild.nodeValue;
  var updatedVal = prompt("Enter updated value..", inputValue);

  if (updatedVal) {
      var todoId = li.getAttribute('data-id');

      firebase.database().ref("todos/" + todoId).set({
          key: todoId,
          value: updatedVal
      }).then(() => {
          li.firstChild.nodeValue = updatedVal;  // Update UI
          console.log("Todo updated!");
      }).catch((error) => {
          console.error("Error updating todo: ", error);
      });
  }
}

// Fetch and display todos from Firebase when the page loads
firebase.database().ref("todos").on("child_added", function(data) {
  const todoData = data.val();
  const liElement = document.createElement("li");
  liElement.setAttribute("data-id", todoData.key);  // Store the Firebase document ID on the <li>

  // Todo text
  var liText = document.createTextNode(todoData.value);
  liElement.appendChild(liText);

  // Create delete button
  var delBtnElement = document.createElement("button");
  delBtnElement.textContent = "Delete";
  delBtnElement.addEventListener("click", function() {
      deleteSingleItem(this);
  });
  liElement.appendChild(delBtnElement);

  // Create edit button
  var editBtnElement = document.createElement("button");
  editBtnElement.textContent = "Edit";
  editBtnElement.addEventListener("click", function() {
      editItem(this);
  });
  liElement.appendChild(editBtnElement);

  // Append the new li to the ul
  ulElement.appendChild(liElement);
});
