exports.handler = async (event) => {

    let apiKey = process.env.MAPBOX_KEY;

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({key: apiKey})
    };

    return response;

}