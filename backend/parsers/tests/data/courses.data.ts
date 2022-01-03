import sections from "./sections.data";

import { Course, ParsedCourse, Section } from "../../../types/types";

export default {
    course_with_no_sections: {
        termId: "202210",
        subject: "CS",
        classId: "3800",
        name: "Theory of Computation",
        coreqs: {
            type: "and",
            values: [],
        },
        sections: [] as Section[],
    } as Course,

    // Theory of comp
    cs3800_202210() {
        return {
            termId: "202210",
            subject: "CS",
            classId: "3800",
            name: "Theory of Computation",
            coreqs: {
                type: "and",
                values: [],
            },
            sections: [sections.cs3800_202210_1(), sections.cs3800_202210_2()],
        } as Course;
    },
    cs3800_202210_parsed() {
        return {
            ...this.cs3800_202210(),
            sections: [sections.cs3800_202210_1_parsed(), sections.cs3800_202210_2_parsed()],
        };
    },

    // Algo
    cs3000_202210() {
        return {
            termId: "202210",
            subject: "CS",
            classId: "3000",
            name: "Algorithms and Data",
            coreqs: {
                type: "and",
                values: [
                    {
                        classId: "3001",
                        subject: "CS",
                    },
                ],
            },
            sections: [
                sections.cs3000_202210_1(),
                sections.cs3000_202210_2(),
                sections.cs3000_202210_3(),
            ],
        } as Course;
    },
    cs3000_202210_parsed(): ParsedCourse {
        return {
            ...this.cs3000_202210(),
            sections: [
                sections.cs3000_202210_1_parsed(),
                sections.cs3000_202210_2_parsed(),
                sections.cs3000_202210_3_parsed(),
            ],
        };
    },

    // Algo recitation
    cs3001_202210() {
        return {
            termId: "202210",
            subject: "CS",
            classId: "3001",
            name: "Recitation for CS 3000",
            coreqs: {
                type: "and",
                values: [
                    {
                        classId: "3000",
                        subject: "CS",
                    },
                ],
            },
            sections: [
                sections.cs3001_202210_1(),
                sections.cs3001_202210_2(),
                sections.cs3001_202210_3(),
                sections.cs3001_202210_4(),
                sections.cs3001_202210_5(),
                sections.cs3001_202210_6(),
                sections.cs3001_202210_7(),
                sections.cs3001_202210_8(),
                sections.cs3001_202210_9(),
            ] as Section[],
        } as Course;
    },
    cs3001_202210_parsed() {
        return {
            ...this.cs3001_202210(),
            sections: [
                sections.cs3001_202210_1_parsed(),
                sections.cs3001_202210_2_parsed(),
                sections.cs3001_202210_3_parsed(),
                sections.cs3001_202210_4_parsed(),
                sections.cs3001_202210_5_parsed(),
                sections.cs3001_202210_6_parsed(),
                sections.cs3001_202210_7_parsed(),
                sections.cs3001_202210_8_parsed(),
                sections.cs3001_202210_9_parsed(),
            ],
        };
    },

    // Logic and comp
    cs2800_202210() {
        return {
            termId: "202210",
            subject: "CS",
            classId: "2800",
            name: "Logic and Computation",
            coreqs: {
                type: "and",
                values: [
                    {
                        classId: "2801",
                        subject: "CS",
                    },
                ],
            },
            sections: [
                sections.cs2800_202210_1(),
                sections.cs2800_202210_2(),
                sections.cs2800_202210_3(),
            ],
        } as Course;
    },
    cs2800_202210_parsed() {
        return {
            ...this.cs2800_202210(),
            sections: [
                sections.cs2800_202210_1_parsed(),
                sections.cs2800_202210_2_parsed(),
                sections.cs2800_202210_3_parsed(),
            ],
        };
    },

    cs2801_202210() {
        return {
            termId: "202210",
            subject: "CS",
            classId: "2801",
            name: "Lab for CS 2800",
            coreqs: {
                type: "and",
                values: [
                    {
                        classId: "2800",
                        subject: "CS",
                    },
                ],
            },
            sections: [
                sections.cs2801_202210_1(),
                sections.cs2801_202210_2(),
                sections.cs2801_202210_3(),
                sections.cs2801_202210_4(),
            ],
        } as Course;
    },
    cs2801_202210_parsed() {
        return {
            ...this.cs2801_202210(),
            sections: [
                sections.cs2801_202210_1_parsed(),
                sections.cs2801_202210_2_parsed(),
                sections.cs2801_202210_3_parsed(),
                sections.cs2801_202210_4_parsed(),
            ],
        };
    },

    // EECE2323
    eece2323_202210() {
        return {
            termId: "202210",
            subject: "EECE",
            classId: "2323",
            name: "Lab for EECE 2322",
            coreqs: {
                type: "and",
                values: [
                    {
                        classId: "2322",
                        subject: "EECE",
                    },
                ],
            },
            sections: [
                sections.eece2323_202210_1(),
                sections.eece2323_202210_2(),
                sections.eece2323_202210_3(),
                sections.eece2323_202210_4(),
                sections.eece2323_202210_5(),
                sections.eece2323_202210_6(),
                sections.eece2323_202210_7(),
            ],
        } as Course;
    },
    eece2323_202210_parsed() {
        return {
            ...this.eece2323_202210(),
            sections: [
                sections.eece2323_202210_1_parsed(),
                sections.eece2323_202210_2_parsed(),
                sections.eece2323_202210_3_parsed(),
                sections.eece2323_202210_4_parsed(),
                sections.eece2323_202210_5_parsed(),
                sections.eece2323_202210_6_parsed(),
                sections.eece2323_202210_7_parsed(),
            ],
        };
    },

    // fundamentals of digital design
    eece2322_202210() {
        return {
            termId: "202210",
            subject: "EECE",
            classId: "2322",
            name: "Fundamentals of Digital Design and Computer Organization",
            coreqs: {
                type: "and",
                values: [
                    {
                        classId: "2323",
                        subject: "EECE",
                    },
                ],
            },
            sections: [
                sections.eece2322_202210_1(),
                sections.eece2322_202210_2(),
                sections.eece2322_202210_3(),
                sections.eece2322_202210_4(),
                sections.eece2322_202210_5(),
            ],
        } as Course;
    },
    eece2322_202210_parsed() {
        return {
            ...this.eece2322_202210(),
            sections: [
                sections.eece2322_202210_1_parsed(),
                sections.eece2322_202210_2_parsed(),
                sections.eece2322_202210_3_parsed(),
                sections.eece2322_202210_4_parsed(),
                sections.eece2322_202210_5_parsed(),
            ],
        };
    },
};
