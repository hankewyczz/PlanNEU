import { minCourses, parseCourses } from "../../api/parsers/parseCourse";
import { generateCombinations } from "../generateResults";
import data from "./data/genResults.data";

test("Gen results", () => {
    const parsedCourses = parseCourses([
        data.cs2800_20210,
        data.cs2801_202210,
        data.cs3000_202210,
        data.cs3001_202210,
        data.cs3800_202210,
        data.eece2323_202210,
        data.eece_2322_202210,
        // data.thtr_1170_202210,
        data.honr_1102_202210,
    ]);
    const minifiedCourses = minCourses(parsedCourses);
    console.log(
        `${minifiedCourses.reduce(
            (acc, cur) => acc * cur.length,
            1
        )} possibilities`
    );
    const results = generateCombinations(minifiedCourses);
    console.log(`${results.length} found`);
});
