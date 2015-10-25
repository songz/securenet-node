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

securenet.createPaymentMethod( {
 customerId: '5000010',
  card: {
    number: '4444 3333 2222 1111',
    expirationDate: '04/2016',
    address: {
      line1: '123 Main St.',
      city: 'Austin',
      state: 'TX',
      zip: '78759'
    },
  },
  phone: '512-250-7865',
  primary: true,
}, function(err, res){
  if(err){
    return console.log(err);
  }
  console.log(res);
});

securenet.charge( {
  amount: 11.00,
  paymentVaultToken: {
    customerId: '5000010',
    paymentMethodId: '1',
    paymentType: 'CREDIT_CARD'
  },
  developerApplication: {
    developerId: 12345678,
    Version: '1.2'
  }
}, function(err, res){
  if(err){
    return console.log(err);
  }
  console.log(res);
});

```


### TODOS
* Every resource method should return a promise so devs don't have to use the regular callback.

