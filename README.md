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
securenet.createCustomer( {
  firstName: 'Test',
  lastName: 'Tester'
}, function(err, res){
  if(err){
    return console.log(err);
  }
  console.log(res);
});
```


### TODOS
* Every resource method should return a promise so devs don't have to use the regular callback.

