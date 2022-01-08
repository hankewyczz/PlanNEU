import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSchedule } from "../pages/api/generateSchedule";
import { Results } from "../types/types";
import { FadeLoader } from "react-spinners";
import ResultPanel from "./ResultPanel";
import styles from "../styles/Results.module.css";
import ResultsLoader from "./ResultsLoader";

const Results: NextPage = () => {
    const router = useRouter();

    const { loaded, hasNextPage, error, courses, sections, results, loadMore } =
        useSchedule(router);

    const errToMsg = (err: any) => {
        console.error(err)
        try {
            return err.response.errors[0].message 
        }
        catch (e) {
            return "Unknown Error"
        }
    }

    return (
        <div className={styles["results-container"]}>
            {error ? (
                
                <div className={styles["results-message-container"]}>
                    <h4>We ran into a problem</h4>
                    <p>{errToMsg(error)}</p>
                </div>
            ) : // Now, we handle the case with no error (ie. normal usage)
            loaded ? (
                // Normal, non-zero results
                results.length > 0 ? (
                    <ResultsLoader
                        results={results}
                        courses={courses}
                        sections={sections}
                        loadMore={loadMore}
                        hasNextPage={hasNextPage}
                    />
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
