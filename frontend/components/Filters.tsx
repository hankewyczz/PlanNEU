import type { NextPage } from "next";
import { useRouter } from "next/router";

const Filters: NextPage = () => {
    const router = useRouter();
    console.log(router.query);
    console.log(router.query.class)

    return (
        <form id="filters-parent">
            <input type="hidden" name="courses" readOnly value={router.query["courses"]} /> 
            <input type="hidden" name="term-id" readOnly value={router.query["term-id"]} /> 
            <div className="form-group row">
                <label
                    htmlFor="min-seats-left"
                    className="col-4 col-form-label"
                >
                    Seats free
                </label>
                <div className="col-8">
                    <input
                        id="min-seats-left"
                        name="min-seats-left"
                        type="number"
                        min="0"
                        placeholder="0"
                        className="form-control"
                        aria-describedby="min-seats-leftHelpBlock"
                    />
                    <span
                        id="min-seats-leftHelpBlock"
                        className="form-text text-muted"
                    >
                        What is the minimum number of seats free you'd like in
                        each section?
                    </span>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="start-time" className="col-4 col-form-label">
                    Earliest start
                </label>
                <div className="col-8">
                    <input
                        id="start-time"
                        name="start-time"
                        type="time"
                        defaultValue="00:01"
                        aria-describedby="start-timeHelpBlock"
                        className="form-control"
                    />
                    <span
                        id="start-timeHelpBlock"
                        className="form-text text-muted"
                    >
                        What is the earliest start time you want for your
                        schedule?
                    </span>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="end-time" className="col-4 col-form-label">
                    Latest end
                </label>
                <div className="col-8">
                    <input
                        id="end-time"
                        name="end-time"
                        type="time"
                        defaultValue="23:59"
                        className="form-control"
                        aria-describedby="end-timeHelpBlock"
                    />
                    <span
                        id="end-timeHelpBlock"
                        className="form-text text-muted"
                    >
                        What is the latest end time you want for your schedule?
                    </span>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="min-days-free" className="col-4 col-form-label">
                    Min. days off
                </label>
                <div className="col-8">
                    <input
                        id="min-days-free"
                        name="min-days-free"
                        type="number"
                        min="0"
                        placeholder="0"
                        className="form-control"
                        aria-describedby="min-days-freeHelpBlock"
                    />
                    <span
                        id="min-days-freeHelpBlock"
                        className="form-text text-muted"
                    >
                        What is the minimum number of days off you'd like?
                        (including weekends)
                    </span>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-4">Specific days off</label>
                <div className="col-8">
                    <div className="custom-control custom-checkbox custom-control-inline">
                        <input
                            name="specific-days-free"
                            id="specific-days-free_0"
                            type="checkbox"
                            className="custom-control-input"
                            value="sun"
                            aria-describedby="specific-days-freeHelpBlock"
                            defaultChecked={true}
                        />
                        <label
                            htmlFor="specific-days-free_0"
                            className="custom-control-label"
                        >
                            Sun
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox custom-control-inline">
                        <input
                            name="specific-days-free"
                            id="specific-days-free_1"
                            type="checkbox"
                            className="custom-control-input"
                            value="mon"
                            aria-describedby="specific-days-freeHelpBlock"
                        />
                        <label
                            htmlFor="specific-days-free_1"
                            className="custom-control-label"
                        >
                            Mon
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox custom-control-inline">
                        <input
                            name="specific-days-free"
                            id="specific-days-free_2"
                            type="checkbox"
                            className="custom-control-input"
                            value="tue"
                            aria-describedby="specific-days-freeHelpBlock"
                        />
                        <label
                            htmlFor="specific-days-free_2"
                            className="custom-control-label"
                        >
                            Tue
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox custom-control-inline">
                        <input
                            name="specific-days-free"
                            id="specific-days-free_3"
                            type="checkbox"
                            aria-describedby="specific-days-freeHelpBlock"
                            className="custom-control-input"
                            value="wed"
                        />
                        <label
                            htmlFor="specific-days-free_3"
                            className="custom-control-label"
                        >
                            Wed
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox custom-control-inline">
                        <input
                            name="specific-days-free"
                            id="specific-days-free_4"
                            type="checkbox"
                            aria-describedby="specific-days-freeHelpBlock"
                            className="custom-control-input"
                            value="thu"
                        />
                        <label
                            htmlFor="specific-days-free_4"
                            className="custom-control-label"
                        >
                            Thu
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox custom-control-inline">
                        <input
                            name="specific-days-free"
                            id="specific-days-free_5"
                            type="checkbox"
                            aria-describedby="specific-days-freeHelpBlock"
                            className="custom-control-input"
                            value="fri"
                        />
                        <label
                            htmlFor="specific-days-free_5"
                            className="custom-control-label"
                        >
                            Fri
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox custom-control-inline">
                        <input
                            name="specific-days-free"
                            id="specific-days-free_6"
                            type="checkbox"
                            aria-describedby="specific-days-freeHelpBlock"
                            className="custom-control-input"
                            value="sat"
                            defaultChecked={true}
                        />
                        <label
                            htmlFor="specific-days-free_6"
                            className="custom-control-label"
                        >
                            Sat
                        </label>
                    </div>
                    <span
                        id="specific-days-freeHelpBlock"
                        className="form-text text-muted"
                    >
                        Do you want any specific days off?
                    </span>
                </div>
            </div>
            <div className="form-group row">
                <label
                    htmlFor="min-honors-courses"
                    className="col-4 col-form-label"
                >
                    Min. honors courses
                </label>
                <div className="col-8">
                    <input
                        id="min-honors-courses"
                        name="min-honors-courses"
                        type="number"
                        defaultValue="0"
                        className="form-control"
                        aria-describedby="min-honors-coursesHelpBlock"
                    />
                    <span
                        id="min-honors-coursesHelpBlock"
                        className="form-text text-muted"
                    >
                        What is the minimum number of honors courses you'd like?
                    </span>
                </div>
            </div>
            <div className="form-group row">
                <div className="offset-4 col-8">
                    <button type="submit" className="btn btn-primary">
                        Apply
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Filters;
