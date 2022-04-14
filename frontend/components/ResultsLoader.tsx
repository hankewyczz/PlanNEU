import { ReactElement } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CourseWithoutSections, SectionWithCourse } from "../types/types";
import ResultPanel from "./ResultPanel/ResultPanel";
import styles from "../styles/ResultsLoader.module.css"

interface ResultsLoaderProps {
    results: string[][];
    courses: Record<string, CourseWithoutSections>;
    sections: Record<string, SectionWithCourse>;
    loadMore: () => void;
    hasNextPage: boolean;
}

function ResultsLoader({
    results,
    courses,
    sections,
    loadMore,
    hasNextPage,
}: ResultsLoaderProps): ReactElement {
    return (
        <InfiniteScroll
            dataLength={results.length}
            next={loadMore}
            hasMore={hasNextPage}
            loader={<h4>Loading more schedules...</h4>}
            endMessage={<h5>That&apos;s all, folks! You&apos;ve loaded all possible schedules for the given filters/courses.</h5>}

        >
            <div className={styles["results-inner-container"]}>
            {results.map((crns) => (
                <ResultPanel
                    key={crns.join(",")}
                    crns={crns}
                    courses={courses}
                    sections={sections}
                />
            ))}
            </div>
        </InfiniteScroll>
    );
}

export default ResultsLoader;
