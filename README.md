# Seneca-backend-task

To start this locally use `npm start`

To run the test the Specs run `npm t`

This task is being run using Elastic Beanstalk (email me for my environment URL). To run it you'll need an environment set up on AWS (see docs) and ebcli (`brew install awsebcli`) and set up with `eb init`

To run the app on EB first create the instance with `eb create` following the prompts
Then `eb deploy` to zip the repo from its most recent commit and send to EB
Run `eb open` to go to the app URL when ready

## My Assumptions:

- `capability to create new stats as well as updating stat` I'm assuming that this means creating new course stats and adding new session to that course rather than updating existing sessions, although it is possible to do that through the POST method there's no explicit endpoint for updating sessions.

- I'm return the average number of modules studied per session since I'm assuming the use can revisit a module in different sessions

- Since this is a mock and there was no mention of a Database I've just stored data in a cache for simplicity
