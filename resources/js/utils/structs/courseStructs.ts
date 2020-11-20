interface CourseContent {
    class: Class;
    sections: SectionContent[];
    type: string;
}

interface Class {
    classAttributes: string[];
    classId: string;
    college: string;
    coreqs: Reqs;
    description: string;
    feeAmount: null;
    feeDescription: string;
    host: string;
    id: string;
    lastUpdateTime: number;
    maxCredits: number;
    minCredits: number;
    name: string;
    nupath: string[];
    optPrereqsFor: PrereqsFor;
    prereqs: Reqs;
    prereqsFor: PrereqsFor;
    prettyUrl: string;
    subject: string;
    termId: string;
    url: string;
    desc: string;
}

interface Reqs {
    type: string;
    values: Value[];
}

interface Value {
    classId: string;
    subject: string;
}

interface PrereqsFor {
    values: Value[];
}