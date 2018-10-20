# serverlessMovieSearch

This is the demo showcased from HackGT 5, which uses AWS Lambda, Dynamo, API Gateway, and S3.

The Lambda code is located in the `lambda` folder. Run `npm run zip` in order to create a file called main.zip which can be deployed to Lambda. The code references AWS IAM accessKeyId and secretAccessKey for DynamoDB logging, which are stored in environmental variables. You'll need to create your own. 

The `S3` folder contains the static html page which makes a request to the API gateway. 
You'll need to replace the hostname with your API Gateway Host Name as the listed hostname may be removed AT ANY TIME!


Have fun!

