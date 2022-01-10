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
import ResultCalendar from "./ResultCalendar";

type Props = {
    crns: string[];
    courses: Record<string, CourseWithoutSections>;
    sections: Record<string, SectionWithCourse>;
};

const ResultPanel: NextPage<Props> = ({ crns, courses, sections }) => {
    return (
        <div className={styles["result-panel"]}>
            <div className={styles["result-panel-header"]}>
                <table className={styles["section-table"]}>
                    <thead>
                        <tr>
                            <th>CRN</th>
                            <th>Course name</th>
                            <th>Campus</th>
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
                                        {section.campus ? section.campus : <i>No campus listed</i>}
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
                <ResultCalendar crns={crns} sections={sections}/>
            </div>
        </div>
    );
};

export default ResultPanel;
