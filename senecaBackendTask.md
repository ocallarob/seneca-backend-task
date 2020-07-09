# Stats Service

## Problem

Our learning platform needs to track a user's stats for a particular course. We do this using a stats service.

The task is to create a simple mock of this service. Your stats service needs to provide the capability to create new stats as well as updating stats. The stats managed by the service are created and updated via HTTP calls. Stats are posted on the completion of a learning session and reflect how the user did on the learning session.

The service interface it defined in the form of a swagger.

## Requirements

- Stats are posted based on the completion of a learning session.
- Stats can be fetched via an aggregated call which aggregates a users stat history for a course they are studying.
- Stats should also be fetchable for a single learning session.
- The service must be easily runnable/startable & deployable on the
  AWS ecosystem by the reviewer of the task. Other than node.js being the main language, any technlogy can be
  used.
- The project should be submitted in the form of a code repository.
- Please state any assumptions or deviations from the specification in the repository readme.

## A little elaboration of the terminology we use to garner a bit more context:

Course - refers to a course on a particular subject that a user is learning. A course is made up of learning sessions.

Session - refers to a learning session that a user studies. Sessions are made up of modules that display content.

Modules - display content to the user. There are 15 module types and these are
used depending on the type of content that is being displayed.
