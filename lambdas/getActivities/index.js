const DynamoDB = require("aws-sdk/clients/dynamodb")
const dynamodb = new DynamoDB.DocumentClient({ region: "us-east-2" })

exports.handler = async (event) => {

    let page;

    if(!event.queryStringParameters) {
        console.log("in here, default!")
        page = 1;
    } else {
        console.log("not the default!")
        page = event.queryStringParameters.page ? event.queryStringParameters.page : 1
    }

    let startDate = new Date()
    let endDate = new Date()
    startDate = (startDate.setDate(startDate.getDate() - (7 * page))).valueOf() // 7 * page days ago
    endDate = (endDate.setDate(endDate.getDate() - (7 * (page - 1)))).valueOf() // 7 * (page - 1) days ago

    console.log("start time " + startDate + " end time: " + endDate)

    let params = {
        TableName: "training-visualizer",
        ProjectionExpression: "#date, activity_id, distance, elapsed_time, elevation_gain, moving_time, #name, polyline, start_latitude, start_longitude, #type",
        FilterExpression: "#date between :start_time and :end_time",
        ExpressionAttributeNames: { // date, name, type are reserved keywords
            "#date": "date",
            "#name": "name",
            "#type": "type"
        },
        ExpressionAttributeValues: {
             ":start_time": startDate,
             ":end_time": endDate 
        }
    }

    let data = await dynamodb.scan(params).promise()

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.Items)
    };

    return response;
}