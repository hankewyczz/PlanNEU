import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { generateScheduleFromQuery } from "../pages/api/generateSchedule";
import { CourseWithoutSections, Results, SectionWithCourse } from "../types/types";
import { FadeLoader } from "react-spinners";
import ResultPanel from "./ResultPanel";
import styles from "../styles/Results.module.css";
import Stats from "./Stats";

const Results: NextPage = () => {
    const router = useRouter();

    const [schedule, setSchedule] = useState({
        results: [] as string[][],
        courses: {} as Record<string, CourseWithoutSections>,
        sections: {} as Record<string, SectionWithCourse>,
    } as Results);

    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;
        generateScheduleFromQuery(router.query)
            .then((schedules) => setSchedule(schedules))
            .catch((error) => setErr(error.toString()));
    }, [router.isReady]);

    return (
        <div className={styles["results-container"]}>
            {err !== null ? (
                <div className={styles["results-message-container"]}>
                    <h4>We ran into a problem</h4>
                    <p>{err}</p>
                </div>
            ) : // Now, we handle the case with no error (ie. normal usage)
            schedule.hasOwnProperty("stats") ? (
                // Normal, non-zero results
                schedule.results.length > 0 ? (
                    schedule.results.map((crns) => (
                        <ResultPanel
                            key={crns.join(",")}
                            crns={crns}
                            courses={schedule.courses}
                            sections={schedule.sections}
                        />
                    ))
                ) : (
                    // Handle the case when zero results are returned
                    <div className={styles["results-message-container"]}>
                        <h4>No Results Found</h4>
                        There are no schedules that fit all of the classes and all of the filters
                        &ndash; try removing some constraints and trying again.
                    </div>
                )
            ) : (
                // Waiting for API
                <FadeLoader color="#e63946" />
            )}
        </div>
    );
};

export default Results;
