import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { generateScheduleFromQuery } from "../pages/api/generateSchedule";
import {
    CourseWithoutSections,
    Results,
    SectionWithCourse,
} from "../types/types";
import { FadeLoader } from "react-spinners";
import ResultPanel from "./ResultPanel";
import styles from "../styles/Results.module.css";

const Results: NextPage = () => {
    const router = useRouter();

    const [schedule, setSchedule] = useState({
        results: [] as string[][],
        courses: {} as Record<string, CourseWithoutSections>,
        sections: {} as Record<string, SectionWithCourse>,
    } as Results);

    useEffect(() => {
        if (!router.isReady) return;
        generateScheduleFromQuery(router.query).then((schedules) =>
            setSchedule(schedules)
        );
    }, [router.isReady]);

    return (
        <div className={styles["results-container"]}>
            {schedule.hasOwnProperty("stats") ? ( // Checks if any results have been generated yet
                //add support for zero-length results
                schedule.results.map((crns) => (
                    <ResultPanel
                        key={crns.join(",")}
                        crns={crns}
                        courses={schedule.courses}
                        sections={schedule.sections}
                    />
                ))
            ) : (
                // Display stats
                <FadeLoader color="#e63946" />
            )}
        </div>
    );
};

export default Results;
