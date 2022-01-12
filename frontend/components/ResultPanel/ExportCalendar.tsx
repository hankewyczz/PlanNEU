import { format, getDay, getHours, getMinutes, getMonth, getYear, fromUnixTime } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CourseWithoutSections, SectionWithCourse } from "../../types/types";
import { ReactElement } from "react";
import styles from "../../styles/ResultCalendar.module.css";
import ics, { createEvents } from "ics";
import { saveAs } from "file-saver";
import { utcToZonedTime } from "date-fns-tz";

interface Props {
    courses: Record<string, CourseWithoutSections>;
    sections: Record<string, SectionWithCourse>;
    crns: string[];
}

const ExportCalendar = (props: Props): ReactElement => {
    const schedule_sections = props.crns.map((crn) => props.sections[crn]);

    // Generates an RRule string
    const generateRRule = (start_time: Date, end: Date) => {
        const rrule = ["FREQ=WEEKLY", "INTERVAL=1"];

        const day = getDay(start_time);
        const day_str = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][day];
        rrule.push(`BYDAY=${day_str}`);

        const until = format(end, "yyyyMMdd");
        rrule.push(`UNTIL=${until}T000000Z`);
        return rrule.join(";");
    };

    // Creates an ICS file
    const createICS = () => {
        const formatted_events: ics.EventAttributes[] = [];

        Object.values(schedule_sections).forEach((sec) => {
            sec.timestamp_meetings.forEach((meeting) => {
                console.log(fromUnixTime(meeting.start))
                const start_time = fromUnixTime(meeting.start);
                const start_date = fromUnixTime(meeting.startDate);

                const end_time = fromUnixTime(meeting.end);
                const end_date = fromUnixTime(meeting.endDate);

                const dateToArray = (date: Date, time: Date): ics.DateArray => {
                    return  [
                        getYear(date),
                        getMonth(date), // Why the hell are months zero-indexed in JS???????
                        getDay(date),
                        getHours(time),
                        getMinutes(time),
                    ];
                };

                formatted_events.push({
                    start: dateToArray(start_date, start_time),
                    startInputType: "local",
                    startOutputType: "local",
                    end: dateToArray(start_date, end_time),
                    title: `${sec.class} - ${props.courses[sec.class].name}`,
                    description: props.courses[sec.class].desc,
                    location: meeting.where,
                    recurrenceRule: generateRRule(start_time, end_date),
                });
            });
        });

        const { value } = createEvents(formatted_events);
        console.log(value);
        const calendar = new Blob([value], { type: "text/calendar;charset=utf-8" });
        saveAs(calendar, "schedule.txt");
    };

    return (
        <div className="col text-center">
            <button className={`${styles["export-button"]} btn`} onClick={createICS}>
                Export Schedule to Calendar
            </button>
        </div>
    );
};

export default ExportCalendar;
