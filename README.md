It generates all possible course combinations, allows filters, infinite scrolling (this actually makes the backend load much lighter, since each request only asks for 5 potential schedules), locking sections in place, calendar view, and exporting to calendar (so I guess this checks off the 'Add to calendar' ticket I was looking at before break? :shrug:)

If you want to test it, just clone the repo and run yarn dev in both the backend and frontend folder, then go to http://localhost:3000/?courses=COURSES&term-id=TERM_ID
COURSES is a comma-separated list of courses OR sections
For courses, the format is Subject/CourseID - like CS/3800
A section is the same, but with the CRN added - CS/3800/12345
TERM_ID is a term-id like "202210"

I didn't bother making an easier way to access it yet - if we wanted to integrate this w/ search, each search result could have an "Add to schedule" button, and when you chose to generate the schedule, it just links to this page w/ the query parameters filled out.T

https://user-images.githubusercontent.com/27775244/163073145-8ce0d2a3-0ae6-48c2-8b31-7f1a3d5e1377.mp4

