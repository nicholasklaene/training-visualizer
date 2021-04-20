exports.handler = async (event) => {
    
    const fetch = require("node-fetch");

    let refreshToken = process.env.REFRESH_TOKEN;
    let clientSecret = process.env.CLIENT_SECRET;
    let clientId = process.env.CLIENT_ID;
    
    const url = "https://www.strava.com/oauth/token";

    let data = await fetch(url, { 
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        }) 
    });

    data = await data.json();

    let accessToken = data.access_token;

    // store in DB

    // return 204 when it is verified to work
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            accessToken: accessToken
        }),
    };

    return response;
    
};
