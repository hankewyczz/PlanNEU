import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";



// Without this, React complains that it doesn't know if this is a controlled input or not
const HiddenInput = (query: string) => {
    const router = useRouter();
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(router.query[query] as string);
    }, [router.query[query]]);

    return (
        <input
            type="hidden"
            name={query}
            readOnly
            value={value}
            onChange={(e) => {}}
        />
    );
};
const Filters: NextPage = () => {
    const router = useRouter();
    const dayChecked = (day: string) => {
        return (
            router.query["specific-days-free"] !== undefined &&
            router.query["specific-days-free"].includes(day)
        );
    };
    return (
        <form id="filters-parent">
            {HiddenInput("courses")}
            {HiddenInput("term-id")}
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
                        defaultValue={router.query["min-seats-left"]}
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
                        defaultValue={router.query["start-time"] || "01:00"}
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
                        defaultValue={router.query["end-time"] || "23:59"}
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
                        defaultValue={router.query["min-days-free"]}
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
                            value="0"
                            aria-describedby="specific-days-freeHelpBlock"
                            defaultChecked={dayChecked("0")}
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
                            value="1"
                            aria-describedby="specific-days-freeHelpBlock"
                            defaultChecked={dayChecked("1")}
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
                            value="2"
                            aria-describedby="specific-days-freeHelpBlock"
                            defaultChecked={dayChecked("2")}
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
                            value="3"
                            defaultChecked={dayChecked("3")}
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
                            value="4"
                            defaultChecked={dayChecked("4")}
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
                            value="5"
                            defaultChecked={dayChecked("5")}
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
                            value="6"
                            defaultChecked={dayChecked("6")}
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
                        defaultValue={router.query["min-honors-courses"] || 0}
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
