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

    let stravaResponseActivities = await fetch("https://www.strava.com/api/v3/athlete/activities?page=1&per_page=5", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    })

    stravaResponseActivities = await stravaResponseActivities.json()

    let activities = []

    for (const activity of stravaResponseActivities) {

        console.log(activity.id)
        params = {
            TableName: "training-visualizer",
            Key: {
                activity_id: activity.id
            },
            AttributesToGet: [
                'activity_id'
            ]
        }

        let result = await dynamodb.get(params).promise() 

        if (result.Item === null || result.Item === undefined) {

            let item = {
                activity_id: activity.id,
                type: activity.type,
                name: activity.name,
                distance: activity.distance,
                moving_time: activity.moving_time,
                polyline: activity.map.summary_polyline,
                elapsed_time: activity.elapsed_time,
                date: activity.start_date_local,
                elevation_gain: activity.total_elevation_gain,
                start_latitude: activity.start_latitude,
                start_longitude: activity.start_longitude

            }

            let current = {
                PutRequest: {
                    Item: item
                }
            }
            console.log("pushing activity " + activity.id + " to DB")
            activities.push(current)

        } else {
            console.log("activity " + activity.id + " already in DB")
        }
    }

    if (activities.length === 0) {
        console.log("No new activities found")
    } else {
        params = {
            RequestItems: {
                "training-visualizer": activities
            }
        }
        await dynamodb.batchWrite(params).promise()
    }

    const response = {
        statusCode: 204
    }

    return response

};