import { createContext, ReactElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const emptyFilters = {
    courses: [],
    termId: "",
    setFormData: (_) => {
        console.log("Should've been overridden");
    },
    onChange: (e) => {
        e.preventDefault();
    },
};

const FiltersContext = createContext(emptyFilters);

export const FiltersProvider = ({ children }): ReactElement => {
    const router = useRouter();
    const [formData, setFormData] = useState(emptyFilters);
    const [hasValidQuery, setHasValidQuery] = useState(true);

    useEffect(() => {
        if (router.isReady) {
            const rawCourses = router.query["courses"];
            const rawTermId = router.query["term-id"];
            
            if (!rawCourses || !rawTermId) {
                setHasValidQuery(false);
                return;
            }

            const arrCourses =
                typeof rawCourses === "string" ? rawCourses.split(",") : rawCourses;
            const courses = arrCourses.map((c) => c.toUpperCase());
            const termid = typeof rawTermId === "string" ? rawTermId : rawTermId[0];

            setFormData({
                ...formData,
                setFormData,
                courses: courses,
                termId: termid,
            });
        }
    }, [router.isReady, router.query]);

    const { Provider } = FiltersContext;
    return (
        hasValidQuery 
        ? <Provider value={formData}>{children}</Provider> 
        : <Popup defaultOpen={true} closeOnDocumentClick={false} closeOnEscape={false}>
            <div className="modalContainer">
                <h2 className="header">Schedule Setup</h2>
                <p>Please enter the courses you'd like to schedule, and the term/semester.</p>
                <p><b>Courses</b> should be formatted with the subject code followed by the course ID number.</p>
                <ul>
                    <li>✅ CS2500</li>
                    <li>✅ CS 2500</li>
                    <li>✅ cs 2500</li>
                    <li>❌ CS-2500</li>
                    <li>❌ fundies</li>
                    <li>❌ Fundamentals of Computer Science 1</li>
                </ul>
            </div>
        </Popup>);
};

FiltersProvider.propTypes = {
    children: PropTypes.node,
};

export default FiltersContext;
