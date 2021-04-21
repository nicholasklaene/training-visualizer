const fetch = require("node-fetch")
const SecretsManager = require("aws-sdk/clients/secretsmanager")
const DynamoDB = require("aws-sdk/clients/dynamodb")
const secretsManager = new SecretsManager({ region: "us-east-2" })
const dynamodb = new DynamoDB.DocumentClient({ region: "us-east-2" })

exports.handler = async (event) => {

    let params = { SecretId: "access_token" }

    let data = await secretsManager.getSecretValue(params).promise()
    let accessToken = data.SecretString
    accessToken = accessToken.substring(1, accessToken.length - 1)

    let stravaResponseActivities = await fetch("https://www.strava.com/api/v3/athlete/activities?page=1&per_page=10", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    });

    stravaResponseActivities = await stravaResponseActivities.json()

    let activities = []

    stravaResponseActivities.forEach(activity => {

        let item = {
            activity_id: activity.id,
            type: activity.type,
            name: activity.name,
            distance: activity.distance,
            moving_time: activity.moving_time,
            polyline: activity.map.summary_polyline,
            elapsed_time: activity.elapsed_time
        }

        let current = {
            PutRequest: {
                Item: item
            }
        }

        activities.push(current)
    });

    params = {
        RequestItems: {
            "training-visualizer": activities
        }
    }


    await dynamodb.batchWrite(params).promise()

    const response = {
        statusCode: 204
    }

    return response

};