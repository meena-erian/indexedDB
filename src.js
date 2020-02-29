// Cross-browser syntax
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

db = {};

var request = window.indexedDB.open("database1", 3);

request.onerror = function(event) {
    console.log("Error opening database:");
    console.log(event);
};
         
request.onsuccess = function(event) {
    console.log("database opened.");
    db = request.result;
};

request.onupgradeneeded = function(event) {
  alert("upgrading database");
  db = event.target.result;

  db.onerror = function(event) {
    console.log("Error opening database:");
    console.log(event);
  };

  // Create an objectStore for this database using
  // IDBDatabase.createObjectStore

  var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });

  // define what data items the objectStore will contain

  objectStore.createIndex("hours", "hours", { unique: false });
  objectStore.createIndex("minutes", "minutes", { unique: false });
  objectStore.createIndex("day", "day", { unique: false });
  objectStore.createIndex("month", "month", { unique: false });
  objectStore.createIndex("year", "year", { unique: false });

  objectStore.createIndex("notified", "notified", { unique: false });

  alert("objectStore created");
};


function insert(itm) {
   var request = db.transaction(["toDoList"], "readwrite").objectStore("toDoList").add({taskTitle: itm});
   
   request.onsuccess = function(event) {
      alert("Your item was successfully added to the list. Now reload the page to make sure it's saved.");
   };
   
   request.onerror = function(event) {
      alert("Something wrong happened");
   };
}

function remove(id){
    var request = db.transaction(["toDoList"], "readwrite").objectStore("toDoList").delete(id);
    
    request.onsuccess = function(event) {
       alert("item was successfully removed from the objectStore");
    };
}


if (!window.indexedDB) {
   window.alert("Unfortunately, Your browser sucks!");
}

function additem(){
  var itm = prompt("Add an item to this list");
  if(itm && itm.length){
    insert(itm);
  }
}

function removeItem(){
    id = document.querySelector("#remId").value;
    if(id && id.length){
        remove(id);
    }
}