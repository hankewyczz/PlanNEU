import type { NextPage } from "next";
import { CourseWithoutSections, SectionWithCourse } from "../../types/types";
import ResultCalendar from "./ResultCalendar";
import styles from "../../styles/ResultPanel.module.css";
import SectionsTable from "./SectionsTable";
import ExportCalendar from "./ExportCalendar";

type Props = {
    crns: string[];
    courses: Record<string, CourseWithoutSections>;
    sections: Record<string, SectionWithCourse>;
};

const ResultPanel: NextPage<Props> = ({ crns, courses, sections }) => {
    return (
        <div className={styles["result-panel"]}>
            <div className={styles["result-panel-header"]}>
                <SectionsTable crns={crns} sections={sections} courses={courses} />
            </div>
            <div className={styles["result-panel-schedule"]}>
                <ResultCalendar crns={crns} sections={sections} courses={courses} />
                <ExportCalendar crns={crns} sections={sections} courses={courses} />

            </div>
        </div>
    );
};

export default ResultPanel;
