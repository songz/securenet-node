'use strict';

var request = require('request');

var defaults = {};
defaults.Customers = {
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
    reqOptions.url = baseUrl + resource;
    var bodyValues = defaults[resource];
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
    }
  };
  return securenet;
}
