# SecureNet node.js bindings 

## Installation

`npm install securenet`


## API Overview

```js
var securenet = require('securenet')({
  securenetid: ' your securenet id key ',
  securekey: ' your securenet secure key '
});
```

```js
securenet.customers.create(
  { email: 'customer@example.com' },
  function(err, customer) {
    err; // null if no error occurred
    customer; // the created customer object
  }
);
```


### TODOS
* Every resource method should return a promise so devs don't have to use the regular callback.

