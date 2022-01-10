import { BinaryMeetingTime } from "../../binaryMeetings";
import { BackendMeeting, MeetingDay } from "../../../types/types";

export default {
    fullWeek: {
        startDate: 19010,
        endDate: 19109,
        where: "Shillman Hall 135",
        type: "Class",
        times: {
            "0": [
                {
                    end: 86_400,
                    start: 0,
                },
            ],
            "1": [
                {
                    end: 86_400,
                    start: 0,
                },
            ],
            "2": [
                {
                    end: 86_400,
                    start: 0,
                },
            ],
            "3": [
                {
                    end: 86_400,
                    start: 0,
                },
            ],
            "4": [
                {
                    end: 86_400,
                    start: 0,
                },
            ],
            "5": [
                {
                    end: 86_400,
                    start: 0,
                },
            ],
            "6": [
                {
                    end: 86_400,
                    start: 0,
                },
            ],
        },
    } as BackendMeeting,
    empty: {
        startDate: 19010,
        endDate: 19109,
        where: "Shillman Hall 135",
        type: "Class",
        times: {},
    } as BackendMeeting,
    cs3000_1: {
        type: "Class",
        times: {
            "2": [
                {
                    end: 41400,
                    start: 35400,
                },
            ],
            "5": [
                {
                    end: 41400,
                    start: 35400,
                },
            ],
        },
        where: "Richards Hall 300",
        endDate: 19109,
        startDate: 19010,
    } as BackendMeeting,
    cs3000_2: {
        type: "Class",
        times: {
            "2": [
                {
                    end: 54900,
                    start: 48900,
                },
            ],
            "5": [
                {
                    end: 54900,
                    start: 48900,
                },
            ],
        },
        where: "Shillman Hall 135",
        endDate: 19109,
        startDate: 19010,
    } as BackendMeeting,
    cs3000_3: {
        type: "Class",
        times: {
            "2": [
                {
                    end: 61500,
                    start: 55500,
                },
            ],
            "5": [
                {
                    end: 61500,
                    start: 55500,
                },
            ],
        },
        where: "Shillman Hall 135",
        endDate: 19109,
        startDate: 19010,
    } as BackendMeeting,
    cs3800_1: {
        type: "Class",
        times: {
            "2": [
                {
                    end: 41400,
                    start: 35400,
                },
            ],
            "5": [
                {
                    end: 41400,
                    start: 35400,
                },
            ],
        },
        where: "Shillman Hall 135",
        endDate: 19109,
        startDate: 19010,
    } as BackendMeeting,
    cs3800_2: {
        type: "Class",
        times: {
            "2": [
                {
                    end: 54900,
                    start: 48900,
                },
            ],
            "5": [
                {
                    end: 54900,
                    start: 48900,
                },
            ],
        },
        where: "Shillman Hall 105",
        endDate: 19109,
        startDate: 19010,
    } as BackendMeeting,
    cs4850: [
        {
            type: "Class",
            times: {
                "2": [
                    {
                        end: 48300,
                        start: 42300,
                    },
                ],
            },
            where: "Hurtig Hall 224",
            endDate: 19109,
            startDate: 19010,
        } as BackendMeeting,
        {
            type: "Class",
            times: {
                "5": [
                    {
                        end: 59400,
                        start: 53400,
                    },
                ],
            },
            where: "Hurtig Hall 224",
            endDate: 19109,
            startDate: 19010,
        } as BackendMeeting,
    ] as BackendMeeting[],
    overlap_single_section: [
        {
            type: "Class",
            times: {
                "2": [
                    {
                        end: 48300,
                        start: 42300,
                    },
                ],
            },
            where: "Hurtig Hall 224",
            endDate: 19109,
            startDate: 19010,
        } as BackendMeeting,
        {
            type: "Class",
            times: {
                "2": [
                    {
                        end: 48300,
                        start: 42300,
                    },
                ],
            },
            where: "Hurtig Hall 224",
            endDate: 19109,
            startDate: 19010,
        } as BackendMeeting,
    ] as BackendMeeting[],
    no_meetings: [],
    cs3000_4: [
        {
            type: "Final Exam",
            times: {
                "2": [
                    {
                        end: 54000,
                        start: 46800,
                    },
                ],
            },
            where: "TBA",
            endDate: 18975,
            startDate: 18975,
        },
        {
            type: "Class",
            times: {
                "2": [
                    {
                        end: 54900,
                        start: 48900,
                    },
                ],
                "5": [
                    {
                        end: 54900,
                        start: 48900,
                    },
                ],
            },
            where: "Cargill Hall 097",
            endDate: 18969,
            startDate: 18878,
        },
    ],
    cs3000_4_parsed: new BinaryMeetingTime(
        "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    ),
};
