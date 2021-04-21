const fetch = require("node-fetch");
const SecretsManager = require("aws-sdk/clients/secretsmanager");
const client = new SecretsManager({ region: "us-east-2" });

exports.handler = async (event) => {

    const refreshToken = process.env.REFRESH_TOKEN;
    const clientSecret = process.env.CLIENT_SECRET;
    const clientId = process.env.CLIENT_ID;

    const url = "https://www.strava.com/oauth/token";

    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: "refresh_token"
        })
    });
    
    data = await data.json();

    const accessToken = data.access_token;

    // store in secrets manager
    const params = {
        SecretId: "access_token",
        SecretString: JSON.stringify(accessToken)
    };

    await client.updateSecret(params).promise();

    const response = {
        statusCode: 204
    };

    return response;

};