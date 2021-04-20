#!/bin/bash
echo "starting build"

# rotate keys lambda
cd rotateKeys/
zip -r ../rotateKeys.zip *
cd ..
aws lambda update-function-code --function-name rotateKeys --zip-file fileb://rotateKeys.zip