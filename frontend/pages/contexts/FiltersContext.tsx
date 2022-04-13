import { createContext, ReactElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

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

    useEffect(() => {
        if (router.isReady) {
            const raw_courses = router.query["courses"];
            const arr_courses =
                typeof raw_courses === "string" ? raw_courses.split(",") : raw_courses;
            const courses = arr_courses.map((c) => c.toUpperCase());

            const raw_termid = router.query["term-id"];
            const termid = typeof raw_termid === "string" ? raw_termid : raw_termid[0];

            setFormData({
                ...formData,
                setFormData,
                courses: courses,
                termId: termid,
            });
        }
    }, [router.isReady, router.query]);

    const { Provider } = FiltersContext;
    return <Provider value={formData}>{children}</Provider>;
};

FiltersProvider.propTypes = {
    children: PropTypes.node,
};

export default FiltersContext;
