'use strict';

var request = require('request');

var allFields = {};
allFields.createCustomers = {
  firstName: 'Test',
  lastName: 'Tester',
  address: {},
  phoneNumber: '512-122-1211',
  emailAddress: 'some@emailaddress.com',
  sendEmailReceipts: true,
  notes: 'This is test notes',
  company: 'Test company',            
  userDefinedFields: [
    {udfname:'udf1', udfvalue: 'udf1_value'},
    {udfname:'udf2', udfvalue: 'udf2_value'},
    {udfname:'udf3', udfvalue: 'udf3_value'},
    {udfname:'udf4', udfvalue: 'udf4_value'}
  ],
  developerApplication: {
    developerId: 12345678,
    Version: '1.2'
  }
};

allFields.createPaymentMethod = {
  customerId: '',
  card: {
    number: '4444 3333 2222 1111',
    expirationDate: '04/2016',
    address: {
      line1: '123 Main St.',
      city: 'Austin',
      state: 'TX',
      zip: '78759'
    }
  },
  phone: '512-250-7865',
  notes: 'Create a vault account',
  accountDuplicateCheckIndicator: 0,
  primary: true,
  userDefinedFields: [
    {udfname:'udf1', udfvalue: 'udf1_value'},
    {udfname:'udf2', udfvalue: 'udf2_value'},
    {udfname:'udf3', udfvalue: 'udf3_value'},
    {udfname:'udf4', udfvalue: 'udf4_value'}
  ],
  developerApplication: {
    developerId: 12345678,
    Version: '1.2'
  }
};

module.exports = function( props ){
  var baseUrl = 'https://gwapi.demo.securenet.com/api/';
  var authString = "Basic " + new Buffer(props.securenetid + ":" + props.securekey).toString('base64');
  var reqOptions = {
    headers: {
      Authorization: authString,
      json: true,
      'Content-Type': 'application/json'
    }
  };

  function sendRequest(type, resource, clientData, cb){
    switch(resource){
      case 'PaymentMethod':
        reqOptions.url = baseUrl + 'Customers/' + clientData.customerId + "/" + resource;
        break;
      default:
        reqOptions.url = baseUrl + resource;
    }
    var bodyValues = allFields[type + resource];
    for(var k in bodyValues){
      if(clientData[k]){
        bodyValues[k] = clientData[k];
      }
    }
    reqOptions.body = JSON.stringify(bodyValues);
    request.post(reqOptions, function(err, httpResponse, response){
      if(err){
        return cb(err, null);
      }
      var body = JSON.parse(response);
      if(!body.success){
        return cb(body, null);
      }
      return cb(null, body);
    });
  }

  var securenet = {
    createCustomer: function(customerInfo, cb){
      sendRequest('create', 'Customers', customerInfo, cb);
    },
    createPaymentMethod: function(paymentInfo, cb){
      sendRequest('create', 'PaymentMethod', paymentInfo, cb);
    }
  };
  return securenet;
}
