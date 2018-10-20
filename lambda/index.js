var request = require('request');
var AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
  // accessKeyId default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  accessKeyId: `${process.env.accessKeyId}`,
  // secretAccessKey default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  secretAccessKey: `${process.env.secretAccessKey}`
});

exports.handler = (event, context, callback) => {
  var url = `https://www.omdbapi.com/?t=${event.queryStringParameters.title}&plot=short&apikey=${process.env.ombdapikey}`
  addToDynamoDB(event.queryStringParameters.title);
  request(url, (err,apiResponse,body)=>{
    if(err){
      throw err
    }
    //this format is EXTREMELY IMPORTANT
    const lambdaResponse = {
      statusCode: 200,
      body: body,
      headers: {
        "Access-Control-Allow-Origin":"*",
        "content-type": "application/json"
      }
    };
    callback(null,lambdaResponse)
  });
};

function addToDynamoDB(title){
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName:"OMDB_Table",
    Item:{
       name: 'Lambda Entry',
       type : 'HTTP',
       title: title,
       timestamp:String(new Date().getTime())
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
}
