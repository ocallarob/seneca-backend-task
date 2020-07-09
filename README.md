# seneca-backend-task

## My Assumptions:

- `capability to create new stats as well as updating stat` I'm assuming that this means creating new course stats and adding new session to that course rather than updating existing sessions, although it is possible to do that through the POST method there's no explicit endpoint for updating sessions.

- I'm return the average number of modules studied per session since I'm assuming the use can revisit a module in different sessions

- Since this is a mock and there was no mention of a Database I've just stored data in a cache for simplicity
