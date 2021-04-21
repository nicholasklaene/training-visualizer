const DynamoDB = require("aws-sdk/clients/dynamodb")
const fetch = require("node-fetch")
const dynamodb = new DynamoDB.DocumentClient({ region: "us-east-2" })

exports.handler = async (event) => {

    let date = (new Date()).getTime()

    let params = {
        TableName: "training-visualizer",
        Key: {
            activity_id: activity.id
        },
        AttributesToGet: [
            'activity_id'
        ]
    }

    let result = await dynamodb.batchGet(params).promise()

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
