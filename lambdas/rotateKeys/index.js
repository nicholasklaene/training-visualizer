exports.handler = async (event) => {

    const fetch = require("node-fetch");
    const SecretsManager = require("aws-sdk/clients/secretsmanager");

    const client = new SecretsManager({
        region: "us-east-2"
    });

    let refreshToken = process.env.REFRESH_TOKEN;
    let clientSecret = process.env.CLIENT_SECRET;
    let clientId = process.env.CLIENT_ID;

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

    client.updateSecret(params, (err, data) => {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    });

    const response = {
        statusCode: 204
    };

    return response;

};