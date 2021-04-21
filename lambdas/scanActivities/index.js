const fetch = require("node-fetch");
const SecretsManager = require("aws-sdk/clients/secretsmanager");
const DynamoDB = require("aws-sdk/clients/dynamodb");
const client = new SecretsManager({ region: "us-east-2" });

exports.handler = async (event) => {

    const refreshToken = process.env.REFRESH_TOKEN;
    const clientSecret = process.env.CLIENT_SECRET;
    const clientId = process.env.CLIENT_ID;

    const params = { SecretId: "access_token" };  

    let data = await client.getSecretValue(params).promise();
    const accessToken = data.SecretString;


    
    // Object.getOwnPropertyNames(accessToken).forEach(prop => console.log(prop));

    const response = {
        statusCode: 204
    };

    return response;

};