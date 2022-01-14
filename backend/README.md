# About

This is the backend of PlanNEU.

The core of this directory is a GraphQL server, which takes requests for schedule generation with options & returns the results. 

Scheduling is an NP-complete problem, so we try to optimize as much as possible here. 


- [About](#about)
- [Structure](#structure)
  - [Main API](#main-api)
  - [Course API](#course-api)
  - [Parsers](#parsers)
  - [Generate Schedules](#generate-schedules)
  - [Filters](#filters)


# Structure

Loosely speaking, this section is organized in the - [About](#about)

## Main API

AKA `api_incoming`

This is the core of the platform - the entry-point and exit-point for all queries.

Generally speaking, incoming requests specify a list of sections and/or courses, as well as filters of some kind.

The result returns, in some form, a limited number of schedule options, as well as their section and course information.
The API result is paginated by an offset, allowing us to generate the schedules in chunks (very useful, due to the computational difficulty of the problem)



## Course API 
AKA `api_outgoing`

This fetches course/section information for the input we get from the main API.

This API just queries the `course-catalog-api` - if we integrate this to the `course-catalog-api`, this won't be necessary anymore.


## Parsers

These parsers transform the courses and sections we get from the `course-catalog-api`.

This is mainly for optimization purposes, with the majority of the work done on the meetings.

Each meeting is transformed into two separate components:

- Binary Meetings
  - This is an efficient (important since we use it so often) way of checking for time overlaps. We take a week's worth of meetings, and represent it as a binary string.
  - Each character represents 5 minutes. A '1' indicates a meeting, and '0' indicates no meeting.
  - The string represents all 7 days, starting with Sunday.
  - Unfortunately, Javascript bitwise operations are limited to 32 bit numbers, so we can't use actual bitwise operations (which would be much faster)

- Timestamp meetings
  - These are meetings with the times converted to UNIX timestamps
  - Banner displays classes in local times, and doesn't take into account timezones.
    - Here, we map the campus to timezone, standardize the time, and return it as a timestamp


## Generate Schedules

This does the heavy lifting. Given a list of list of sections, it first filters them out, then generates combinations as a Generator object.

The Generator does work on-demand - it only calculates as many courses at a time as we want, which shouldn't be a large number. 

Since the API is paginated, each request shouldn't ask for many results (at the moment, it's 5), so this doesn't take long to generate. 


More details can be found in the code itself - I don't want to write about implementation details here.


## Filters

Rather self-explanatory, aside from one thing. There are two types of filters:

- Section filters
  - These filters apply to each section, not to a schedule as a whole.
  - Examples include:
    - Minimum seats free
    - Any specific days free
    - Earliest start time
    - Latest end time
- Schedule filters
  - These are filters which can only be considered on a schedule-wise basis
  - Examples:   
    - Number of days free (not specific days free)
    - Minimum number of honors courses