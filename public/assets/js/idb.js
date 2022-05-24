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

// this function will execute if a new pizza is submitted with no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access the object store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // add record to the store with add method
    pizzaObjectStore.add(record);
};

// function that uploads pizza data once internect connection is restored
function uploadPizza() {
    const transaction = db.transaction(['new_pizza'], 'readwrite');
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // get all records from store and set to a variable
    const getAll = pizzaObjectStore.getAll();

    // upon a successful .getAll() execution, run this function
    getAll.onsuccess = function() {
        // if there was data in IndexedDB's store, send it to the api server
        if(getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'post',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if(serverResponse.message) {
                    throw new Error(serverResponse);
                }
                const transaction = db.transaction(['new_pizza'], 'readwrite');
                const pizzaObjectStore = transaction.objectStore('new_pizza');

                // clear all items in the store
                pizzaObjectStore.clear();

                alert('All saved pizza has been submitted!');
            })
            .catch(err => console.log(err));
        }
    }
};

// listen for app coming back online
window.addEventListener('online', uploadPizza);