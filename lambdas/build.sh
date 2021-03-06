#!/bin/bash
echo "starting build"

# rotate keys lambda
cd rotateKeys/
zip -r ../rotateKeys.zip *
cd ..
aws lambda update-function-code --function-name rotateKeys --zip-file fileb://rotateKeys.zip

# scan activities
cd scanActivities/
zip -r ../scanActivities.zip *
cd ..
aws lambda update-function-code --function-name scanActivities --zip-file fileb://scanActivities.zip

# get activities
cd getActivities/
zip -r ../getActivities.zip *
cd ..
aws lambda update-function-code --function-name getActivities --zip-file fileb://getActivities.zip

# get map box key
cd getMapBoxKey/
zip -r ../getMapBoxKey.zip *
cd ..
aws lambda update-function-code --function-name getMapBoxKey --zip-file fileb://getMapBoxKey.zip

echo "Build complete!"