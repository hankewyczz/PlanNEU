import { Calendar, dateFnsLocalizer, Views, Formats } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, getHours, fromUnixTime } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { SectionWithCourse } from "../types/types";
import { COLORS } from "../global";

const locales = {
    "en-US": enUS,
};

const formats: Formats = {
    dayFormat: "EEE",
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface Props {
    sections: Record<string, SectionWithCourse>;
    crns: string[];
}

const ResultCalendar = (props: Props) => {
    const schedule_sections = props.crns.map((crn) => props.sections[crn]);

    


    const events = schedule_sections.flatMap((sec, idx) =>
        sec.timestamp_meetings.map((meeting) => {
            return {
                title: sec.classId,
                start: fromUnixTime(meeting.start),
                end: fromUnixTime(meeting.end),
                allDay: false,
                color: COLORS[idx] || COLORS[0], // There should be enough colors - we limit the number of courses
            };
        })
    );

    // We want to auto-scroll to the hour of the very first event, to make the view more pertinant to what they want to see
    const scroll_to_hour = Math.min(...events.map((e): number => getHours(e.start)));

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                style={{ height: 300 }}
                defaultView={Views.WEEK}
                defaultDate={new Date(1970, 0, 4)}
                selectable={false}
                toolbar={false}
                scrollToTime={new Date(1970, 0, 4, scroll_to_hour)}
                views={{ week: true }}
                onView={() => {}}
                onDoubleClickEvent={() => {}}
                timeslots={4}
                step={15}
                formats={formats}
                eventPropGetter={event => ({
                    style: {
                      backgroundColor: event.color,
                    },
                  })}
            />
        </div>
    );
};

export default ResultCalendar;
