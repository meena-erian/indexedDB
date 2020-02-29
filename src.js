// Cross-browser syntax
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

function insert(itm) {
   var request = db.transaction(["todos"], "readwrite").objectStore("todo")
   .add(itm);
   
   request.onsuccess = function(event) {
      alert("Your item was successfully added to the list. Now reload the page to make sure it's saved.");
   };
   
   request.onerror = function(event) {
      alert("Something wrong happened");
   }
}

if (!window.indexedDB) {
   window.alert("Unfortunately, Your browser sucks!");
}
else{
  var itm = prompt("Add an item to this list");
  if(itm && itm.length){
    insert(itm);
  }
}
