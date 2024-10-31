var ulElement = document.getElementById("list");

function addTodo() {
  var input = document.getElementById("todoInput");

  if (input.value.trim()) {
    var liElement = document.createElement("li");
    var liText = document.createTextNode(input.value);
    liElement.appendChild(liText);
    ulElement.appendChild(liElement);

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

    console.log(liElement);
    input.value = "";
  } else {
    alert("fill the field..");
  }
}

function deleteAllItems() {
  ulElement.innerHTML = "";
}

function deleteSingleItem(e) {
  e.parentNode.remove();
}

function editItem(e) {
  var li = e.parentNode;
  var inputValue = li.firstChild.nodeValue;
  var updatedVal = prompt("Enter updated value..", inputValue);

  if (updatedVal) {
    li.firstChild.nodeValue = updatedVal;
  }
}
