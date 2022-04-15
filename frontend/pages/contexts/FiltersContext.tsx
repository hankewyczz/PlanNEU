import { createContext, ReactElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Form, Field } from 'react-final-form'

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
const COURSE_CODE_PATTERN = /^\s*([a-zA-Z]{2,4})\s*(\d{4})\s*$/i
const TERMID_PATTERN = /^\s*\d{6}\s*$/

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

            setFormData(formData => ({
                ...formData,
                setFormData,
                courses: courses,
                termId: termid,
            }));
        }
    }, [router.isReady, router.query]);


    const validCourseCode = (value, num) => {
        if ((value || num === 0) && !COURSE_CODE_PATTERN.test(value)) {
            return '(Invalid course code format)';
        }
        return undefined;
    };

    const validTermId = value => !TERMID_PATTERN.test(value) ? 'Invalid term ID format' : undefined;
    const onSubmit = (form) => {
        const courses = form.courses
            .filter(c => c)
            .map(course => {
                const match = course.match(COURSE_CODE_PATTERN);
                return `${match[1]}/${match[2]}`
            })
            .join(',');
        const url = new URL(location.href);
        url.searchParams.set('term-id', form.termId);
        url.searchParams.set('courses', courses);
        location.assign(url.search);
    }

    const { Provider } = FiltersContext;
    return (
        hasValidQuery 
        ? <Provider value={formData}>{children}</Provider> 
        : <Popup defaultOpen={true} closeOnDocumentClick={false} closeOnEscape={false}>
            <div className="modalContainer">
                <h2 className="header">Schedule Setup</h2>
                <p>Please enter the courses you&apos;d like to schedule, and the term/semester.</p>
                <p><b>Courses</b> should be formatted with the subject code followed by the course ID number.</p>
                <ul>
                    <li>✅ CS2500</li>
                    <li>✅ CS 2500</li>
                    <li>✅ cs 2500</li>
                    <li>❌ CS-2500</li>
                    <li>❌ fundies</li>
                    <li>❌ Fundamentals of Computer Science 1</li>
                </ul>
                <hr />
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            {Array.from({ length: 8 }, (_, i) => (
                                <Field name={`courses[${i}]`}
                                       validate={(val) => validCourseCode(val, i)} key={i}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Course #{i + 1}:</label><span className='gap'></span>
                                        <input {...input} type="text" placeholder="(Optional) Course" />
                                        <span className='gap'></span>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>))}
                            <br />
                            <hr />
                            For the time being:
                            <ol>
                                <li>Go to <a href="https://searchneu.com/NEU">searchneu.com</a>, pick the term you want, and press the search button.</li>
                                <li>In the address bar, your URL should look like <pre>https://searchneu.com/NEU/202310/search</pre></li>
                                <li>Copy the string in between &quot;/NEU/&quot; and &quot;/search&quot; (in this case - &quot;202310&quot;)</li>
                                <li>Paste that string into the term ID input below</li>
                            </ol>
                            <Field name='termId' validate={validTermId}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Term ID:</label><span className='gap'></span>
                                        <input {...input} type="text" value="202310" placeholder="Term ID" />
                                        <span className='gap'></span>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <hr />
                            <div className="buttons" style={{ textAlign: 'center' }}>
                                <button type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                />
            </div>
        </Popup>);
};

FiltersProvider.propTypes = {
    children: PropTypes.node,
};

export default FiltersContext;
