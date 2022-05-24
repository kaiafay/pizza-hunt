// variable to hold db connection
let db;
// establish connection to IndexedDB database called 'pizza_hunt" and set it to version 1
const request = indexedDB.open('pizza_hunt', 1);

// this event will trigger if the database version changes
request.onupgradeneeded = function(event) {
    // save a locally scoped reference to the database
    const db = event.target.result;
    // create an object store called 'new_pizza', set it to have an auto incrementing primary key
    db.createObjectStore('new_pizza', { autoIncrement: true });
}

// this event will trigger every time the database is interacted with
request.onsuccess = function(event) {
    // when db is successfully created or established, save reference to db in global variable
    db = event.target.result;

    // run uploadPizza() function if app is online
    if(navigator.onLine) {
        uploadPizza();
    }
};

// this event will trigger if there's an issue with the database interaction
request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};