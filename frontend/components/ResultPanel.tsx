import type { NextPage } from "next";
import {
    CourseWithoutSections,
    MeetingDay,
    meetingDayToString,
    ScheduleMeeting,
    scheduleMeetingToString,
    SectionWithCourse,
} from "../types/types";
import styles from "../styles/ResultPanel.module.css";

type Props = {
    crns: string[];
    courses: Record<string, CourseWithoutSections>;
    sections: Record<string, SectionWithCourse>;
};

const ResultPanel: NextPage<Props> = ({ crns, courses, sections }) => {
    const schedule: Record<MeetingDay, ScheduleMeeting[]> = {
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
    };

    for (const crn of crns) {
        const section = sections[crn];
        for (const meeting of section.meetings) {
            // Ignore exams
            if (meeting.type.toLowerCase().includes('exam')) {
                continue;
            }
            for (const [day, day_meetings] of Object.entries(meeting.times)) {
                // Break it down into objects
                // Each object contains a CRN, and a single meeting (one start and one end time)
                day_meetings.forEach((m) => {
                    schedule[day as MeetingDay].push({
                        name: section.classId,
                        meeting: m,
                    });
                });
            }
        }
    }

    const schedule_elements = [];
    for (const [day, meetings] of Object.entries(schedule)) {
        if (meetings.length === 0) {
            continue;
        }

        // Sort the times by start
        meetings.sort((a, b) => a.meeting.start - b.meeting.start);

        schedule_elements.push(
            <div key={meetingDayToString(day as MeetingDay)}>
                <b>{meetingDayToString(day as MeetingDay)}</b>
                <ul>
                    {meetings.map((m) => {
                        const str = scheduleMeetingToString(m);
                        return <li key={str}>{str}</li>;
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div className={styles["result-panel"]}>
            <div className={styles["result-panel-header"]}>
                <table className={styles["section-table"]}>
                    <thead>
                        <tr>
                            <th>CRN</th>
                            <th>Course name</th>
                            <th>Professor(s)</th>
                            <th>Seats left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crns.map((crn) => {
                            const section = sections[crn];

                            const online_class =
                                section.classType.toLowerCase() === "online";

                            return (
                                <tr key={section.url}>
                                    <td>
                                        <a href={section.url} target="_blank" rel="noopener">
                                            {crn}
                                        </a>
                                    </td>

                                    <td>
                                        {section.classId} &mdash;{" "}
                                        {courses[section.classId].name}&nbsp;
                                        {online_class ? <b>[Online] </b> : ""}
                                        {section.honors ? <b>[Honors] </b> : ""}
                                    </td>
                                    <td>
                                        {section.profs.length > 0 ? (
                                            section.profs.join(", ")
                                        ) : (
                                            <i>No professors listed</i>
                                        )}
                                    </td>
                                    <td>
                                        {section.seatsRemaining}/
                                        {section.seatsCapacity}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles["result-panel-schedule"]}>
                {schedule_elements}
            </div>
        </div>
    );
};

export default ResultPanel;
