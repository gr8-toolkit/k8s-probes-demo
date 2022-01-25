# ./redeploy.sh
SCRIPT=./scripts/perf-test.js
if [ -z $TEST_URL ]; then echo 'TEST_URL is not set. Use the following command to set it: \nexport TEST_URL=http://your.server.url'; exit 1; fi
k6 run $SCRIPT
