import sectionData from "./sections.data"

import { Course, Section } from "../../../../types/types";

export default {
  cs3800_202210: {
    termId: "202210",
    subject: "CS",
    classId: "3800",
    name: "Theory of Computation",
    coreqs: {
      type: "and",
      values: [],
    },
    sections: [
      {
        classType: "Lecture",
        crn: "10376",
        seatsCapacity: 49,
        seatsRemaining: 7,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10376",
        profs: ["Jason Hemann"],
        meetings: [
          {
            type: "Final Exam",
            times: {
              "5": [
                {
                  end: 54000,
                  start: 46800,
                },
              ],
            },
            where: "TBA",
            endDate: 18978,
            startDate: 18978,
          },
          {
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
            where: "Hurtig Hall 130",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "16453",
        seatsCapacity: 87,
        seatsRemaining: 12,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16453",
        profs: ["Jason Hemann"],
        meetings: [
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
            where: "Richards Hall 300",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
    ] as Section[],
  } as Course,
  cs3000_202210_parsed() {
    return {...this.cs3000_202210, "sections": [sectionData.algo1_parsed(), sectionData.algo2_parsed(), sectionData.algo3_parsed()]}
  },
  cs3000_202210: {
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
      {
        classType: "Lecture",
        crn: "14087",
        seatsCapacity: 114,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=14087",
        profs: ["Andrew Van Der Poel"],
        meetings: [
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
      },
      {
        classType: "Lecture",
        crn: "15730",
        seatsCapacity: 49,
        seatsRemaining: 1,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=15730",
        profs: ["Andrew Van Der Poel"],
        meetings: [
          {
            type: "Final Exam",
            times: {
              "5": [
                {
                  end: 54000,
                  start: 46800,
                },
              ],
            },
            where: "TBA",
            endDate: 18978,
            startDate: 18978,
          },
          {
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
            where: "Knowles Center 010",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "14051",
        seatsCapacity: 250,
        seatsRemaining: 30,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=14051",
        profs: ["Rajmohan Rajaraman"],
        meetings: [
          {
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
            where: "Science Engineering Complex 102",
            endDate: 18969,
            startDate: 18878,
          },
          {
            type: "Final Exam",
            times: {
              "1": [
                {
                  end: 54000,
                  start: 46800,
                },
              ],
            },
            where: "TBA",
            endDate: 18974,
            startDate: 18974,
          },
        ],
      },
    ] as Section[],
  } as Course,
  cs3001_202210: {
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
      {
        classType: "Recitation/Discussion",
        crn: "16199",
        seatsCapacity: 42,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16199",
        profs: [],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 46200,
                  start: 42300,
                },
              ],
            },
            where: "Snell Library 015",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Recitation/Discussion",
        crn: "16200",
        seatsCapacity: 44,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16200",
        profs: ["Elizabeth O'Reilly", "Alexander Gonzalez"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 46200,
                  start: 42300,
                },
              ],
            },
            where: "International Village 022",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Recitation/Discussion",
        crn: "16201",
        seatsCapacity: 44,
        seatsRemaining: 1,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16201",
        profs: [],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 52800,
                  start: 48900,
                },
              ],
            },
            where: "International Village 022",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Recitation/Discussion",
        crn: "16204",
        seatsCapacity: 48,
        seatsRemaining: 4,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16204",
        profs: [],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Snell Library 037",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Recitation/Discussion",
        crn: "16206",
        seatsCapacity: 42,
        seatsRemaining: 10,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16206",
        profs: [],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 68700,
                  start: 64800,
                },
              ],
            },
            where: "Snell Library 111",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Recitation/Discussion",
        crn: "16202",
        seatsCapacity: 44,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16202",
        profs: [],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 52800,
                  start: 48900,
                },
              ],
            },
            where: "Dodge Hall 330",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Recitation/Discussion",
        crn: "16203",
        seatsCapacity: 48,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16203",
        profs: [],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 57300,
                  start: 53400,
                },
              ],
            },
            where: "Snell Library 121",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Recitation/Discussion",
        crn: "16205",
        seatsCapacity: 48,
        seatsRemaining: 13,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16205",
        profs: [],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 227",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Recitation/Discussion",
        crn: "18553",
        seatsCapacity: 48,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18553",
        profs: [],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 57300,
                  start: 53400,
                },
              ],
            },
            where: "Shillman Hall 415",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
    ] as Section[],
  } as Course,
  cs2800_20210: {
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
      {
        classType: "Lecture",
        crn: "10146",
        seatsCapacity: 48,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10146",
        profs: ["Stavros Trypakis"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 41700,
                  start: 37800,
                },
              ],
              "3": [
                {
                  end: 41700,
                  start: 37800,
                },
              ],
              "4": [
                {
                  end: 41700,
                  start: 37800,
                },
              ],
            },
            where: "Dodge Hall 070",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "16217",
        seatsCapacity: 48,
        seatsRemaining: 3,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16217",
        profs: ["Stavros Trypakis"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Dodge Hall 070",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "18549",
        seatsCapacity: 48,
        seatsRemaining: 4,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18549",
        profs: ["Olin Shivers III"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Dodge Hall 130",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
    ] as Section[],
  } as Course,
  cs2801_202210: {
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
      {
        classType: "Lab",
        crn: "10946",
        seatsCapacity: 36,
        seatsRemaining: 6,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10946",
        profs: ["Stavros Trypakis"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 55200,
                  start: 52200,
                },
              ],
            },
            where: "West Village H 210B",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "19062",
        seatsCapacity: 36,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19062",
        profs: ["Stavros Trypakis"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 45300,
                  start: 42300,
                },
              ],
            },
            where: "West Village H 210B",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "11775",
        seatsCapacity: 36,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=11775",
        profs: ["Stavros Trypakis"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 58500,
                  start: 55500,
                },
              ],
            },
            where: "West Village H 210B",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "10619",
        seatsCapacity: 36,
        seatsRemaining: 1,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699283,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10619",
        profs: ["Stavros Trypakis"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 51900,
                  start: 48900,
                },
              ],
            },
            where: "West Village H 210B",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
    ],
  } as Course,
  eece2323_202210: {
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
      {
        classType: "Lab",
        crn: "16946",
        seatsCapacity: 42,
        seatsRemaining: 20,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16946",
        profs: ["John Kimani"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 40500,
                  start: 33300,
                },
              ],
            },
            where: "Hayden Hall 009",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "10526",
        seatsCapacity: 42,
        seatsRemaining: 0,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10526",
        profs: ["John Kimani"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 56700,
                  start: 49500,
                },
              ],
            },
            where: "Hayden Hall 009",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "18984",
        seatsCapacity: 19,
        seatsRemaining: 8,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18984",
        profs: ["Thomas Consi"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 56700,
                  start: 49500,
                },
              ],
            },
            where: "Hayden Hall 009",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "18691",
        seatsCapacity: 42,
        seatsRemaining: 15,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18691",
        profs: ["Thomas Consi"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 48600,
                  start: 41400,
                },
              ],
            },
            where: "Hayden Hall 009",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "19466",
        seatsCapacity: 19,
        seatsRemaining: 1,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19466",
        profs: ["Emad Aboelela"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 64800,
                  start: 57600,
                },
              ],
            },
            where: "Hayden Hall 009",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "10524",
        seatsCapacity: 42,
        seatsRemaining: 7,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10524",
        profs: ["Miriam Leeser"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 40500,
                  start: 33300,
                },
              ],
            },
            where: "Hayden Hall 009",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lab",
        crn: "10525",
        seatsCapacity: 42,
        seatsRemaining: 2,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10525",
        profs: ["Emad Aboelela"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 48600,
                  start: 41400,
                },
              ],
            },
            where: "Hayden Hall 009",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
    ],
  } as Course,
  eece_2322_202210: {
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
      {
        classType: "Lecture",
        crn: "16944",
        seatsCapacity: 49,
        seatsRemaining: 3,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16944",
        profs: ["John Kimani"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 52800,
                  start: 48900,
                },
              ],
              "3": [
                {
                  end: 52800,
                  start: 48900,
                },
              ],
              "4": [
                {
                  end: 52800,
                  start: 48900,
                },
              ],
            },
            where: "Richards Hall 253",
            endDate: 18969,
            startDate: 18878,
          },
          {
            type: "Final Exam",
            times: {
              "5": [
                {
                  end: 63000,
                  start: 55800,
                },
              ],
            },
            where: "TBA",
            endDate: 18978,
            startDate: 18978,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "10350",
        seatsCapacity: 48,
        seatsRemaining: 4,
        waitCapacity: 8,
        waitRemaining: 8,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10350",
        profs: ["Miriam Leeser"],
        meetings: [
          {
            type: "Final Exam",
            times: {
              "1": [
                {
                  end: 36000,
                  start: 28800,
                },
              ],
            },
            where: "TBA",
            endDate: 18974,
            startDate: 18974,
          },
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 41700,
                  start: 37800,
                },
              ],
              "3": [
                {
                  end: 41700,
                  start: 37800,
                },
              ],
              "4": [
                {
                  end: 41700,
                  start: 37800,
                },
              ],
            },
            where: "Science Engineering Complex 142",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "18690",
        seatsCapacity: 49,
        seatsRemaining: 4,
        waitCapacity: 8,
        waitRemaining: 8,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18690",
        profs: ["Emad Aboelela"],
        meetings: [
          {
            type: "Final Exam",
            times: {
              "5": [
                {
                  end: 36000,
                  start: 28800,
                },
              ],
            },
            where: "TBA",
            endDate: 18971,
            startDate: 18971,
          },
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 37200,
                  start: 33300,
                },
              ],
              "3": [
                {
                  end: 37200,
                  start: 33300,
                },
              ],
              "4": [
                {
                  end: 37200,
                  start: 33300,
                },
              ],
            },
            where: "Robinson Hall 107",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19033",
        seatsCapacity: 49,
        seatsRemaining: 6,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19033",
        profs: ["John Kimani"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 59400,
                  start: 53400,
                },
              ],
              "3": [
                {
                  end: 59400,
                  start: 53400,
                },
              ],
            },
            where: "Snell Library 035",
            endDate: 18969,
            startDate: 18878,
          },
          {
            type: "Final Exam",
            times: {
              "5": [
                {
                  end: 63000,
                  start: 55800,
                },
              ],
            },
            where: "TBA",
            endDate: 18978,
            startDate: 18978,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "10553",
        seatsCapacity: 49,
        seatsRemaining: 33,
        waitCapacity: 8,
        waitRemaining: 8,
        lastUpdateTime: 1638994699006,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=10553",
        profs: ["Thomas Consi"],
        meetings: [
          {
            type: "Final Exam",
            times: {
              "3": [
                {
                  end: 36000,
                  start: 28800,
                },
              ],
            },
            where: "TBA",
            endDate: 18976,
            startDate: 18976,
          },
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Kariotis Hall 011",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
    ],
  } as Course,
  thtr_1170_202210: {
    termId: "202210",
    subject: "THTR",
    classId: "1170",
    name: "The Eloquent Presenter",
    coreqs: {
      type: "and",
      values: [],
    },
    sections: [
      {
        classType: "Studio",
        crn: "16164",
        seatsCapacity: 17,
        seatsRemaining: 3,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068081,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16164",
        profs: ["Gregory Allen"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 48300,
                  start: 42300,
                },
              ],
            },
            where: "Ryder Hall 141",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "16816",
        seatsCapacity: 17,
        seatsRemaining: 3,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068080,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16816",
        profs: ["Gregory Allen"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 48300,
                  start: 42300,
                },
              ],
            },
            where: "Ryder Hall 205",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "13536",
        seatsCapacity: 17,
        seatsRemaining: 1,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068080,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13536",
        profs: ["Mara Sidmore"],
        meetings: [
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
            where: "Ryder Hall 372",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "13537",
        seatsCapacity: 17,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068081,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13537",
        profs: ["Ilya Vidrin"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 48300,
                  start: 42300,
                },
              ],
            },
            where: "Ryder Hall 143",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "16163",
        seatsCapacity: 17,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068081,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16163",
        profs: ["Charles Linshaw"],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 59400,
                  start: 53400,
                },
              ],
            },
            where: "Ryder Hall 372",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "16165",
        seatsCapacity: 17,
        seatsRemaining: 3,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068081,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16165",
        profs: ["Bridget O'Leary"],
        meetings: [
          {
            type: "Class",
            times: {
              "5": [
                {
                  end: 54900,
                  start: 48900,
                },
              ],
            },
            where: "Ryder Hall 143",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "13126",
        seatsCapacity: 17,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068080,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13126",
        profs: ["Ilya Vidrin"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 48300,
                  start: 42300,
                },
              ],
            },
            where: "Ryder Hall 147",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "13128",
        seatsCapacity: 17,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068080,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13128",
        profs: ["Gregory Allen"],
        meetings: [
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
            where: "Ryder Hall 334",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "14383",
        seatsCapacity: 17,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068081,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=14383",
        profs: ["Gregory Allen"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 59400,
                  start: 53400,
                },
              ],
            },
            where: "Kariotis Hall 208",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "16814",
        seatsCapacity: 17,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068081,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16814",
        profs: ["Charles Linshaw"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 61500,
                  start: 55500,
                },
              ],
            },
            where: "West Village F 118",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "13127",
        seatsCapacity: 17,
        seatsRemaining: 1,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068080,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13127",
        profs: ["Regine Vital"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 59400,
                  start: 53400,
                },
              ],
            },
            where: "Kariotis Hall 208",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Studio",
        crn: "14574",
        seatsCapacity: 17,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639449068081,
        campus: "Boston",
        honors: false,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=14574",
        profs: ["Bridget O'Leary"],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 48300,
                  start: 42300,
                },
              ],
            },
            where: "Forsyth Building 128",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
    ] as Section[],
  } as Course,
  honr_1102_202210: {
    termId: "202210",
    subject: "HONR",
    classId: "1102",
    name: "Honors Discovery",
    coreqs: {
      type: "and",
      values: [],
    },
    sections: [
      {
        classType: "Lecture",
        crn: "13660",
        seatsCapacity: 19,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13660",
        profs: ["Justin Silvestri", "Laurie Kramer", "OluwaFemi Koledoye"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ryder Hall 394",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "18375",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18375",
        profs: ["Justin Silvestri", "Laurie Kramer", "Jeffrey Sullivan"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ell Hall 408",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19581",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19581",
        profs: ["Justin Silvestri", "Laurie Kramer", "Laura Whitley"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 118",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19571",
        seatsCapacity: 19,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19571",
        profs: ["Justin Silvestri", "Jacqueline Huynh", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hayden Hall 222",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "20736",
        seatsCapacity: 19,
        seatsRemaining: 3,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453536000,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=20736",
        profs: ["Justin Silvestri", "Laurie Kramer", "Jason Nolen-Doerr"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 69600,
                  start: 65700,
                },
              ],
            },
            where: "Hastings Suite 110",
            endDate: 18978,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13652",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13652",
        profs: ["Justin Silvestri", "Devina Raithatha", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ryder Hall 454",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13654",
        seatsCapacity: 19,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13654",
        profs: ["Justin Silvestri", "Laurie Kramer", "Brooke Williams"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 235",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13656",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13656",
        profs: ["Justin Silvestri", "Laurie Kramer", "Sheyla Carew"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 206",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13657",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13657",
        profs: ["Justin Silvestri", "Jacqueline Huynh", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 243",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13668",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13668",
        profs: ["Linda Ayrapetov", "Justin Silvestri", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Kariotis Hall 104",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13911",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13911",
        profs: [
          "Justin Silvestri",
          "Laurie Kramer",
          "Vijayamirunalini Mahabharathi",
        ],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Snell Library 001",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "18372",
        seatsCapacity: 19,
        seatsRemaining: 3,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18372",
        profs: ["Justin Silvestri", "Laurie Kramer", "Crispin Sujith Cletus"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "International Village 016",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19577",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19577",
        profs: ["Justin Silvestri", "Laurie Kramer", "Crispin Sujith Cletus"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Dodge Hall 140",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19569",
        seatsCapacity: 19,
        seatsRemaining: 3,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19569",
        profs: ["Justin Silvestri", "Laurie Kramer", "Jason Nolen-Doerr"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "East Village 102",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19572",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19572",
        profs: ["Justin Silvestri", "Laurie Kramer", "Laura Whitley"],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "East Village 102",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13671",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13671",
        profs: ["Justin Silvestri", "Devina Raithatha", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 103",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "18369",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18369",
        profs: ["Justin Silvestri", "Devina Raithatha", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 237",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19580",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19580",
        profs: ["Justin Silvestri", "Laurie Kramer", "Kaitlyn Hicks"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 114",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13650",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13650",
        profs: ["Justin Silvestri", "Laurie Kramer", "Patricia Wilder"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 239",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19570",
        seatsCapacity: 19,
        seatsRemaining: 7,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19570",
        profs: ["Justin Silvestri", "Laurie Kramer", "Jeffrey Sullivan"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ell Hall 410",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13651",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13651",
        profs: [
          "Justin Silvestri",
          "Laurie Kramer",
          "Vijayamirunalini Mahabharathi",
        ],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 241",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13909",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535996,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13909",
        profs: ["Mary Barrows", "Justin Silvestri", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ryder Hall 456",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13648",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13648",
        profs: ["Mary Barrows", "Justin Silvestri", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Behrakis Health Sciences Cntr 307",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13666",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13666",
        profs: [
          "Justin Silvestri",
          "Laurie Kramer",
          "Vijayamirunalini Mahabharathi",
        ],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ryder Hall 215",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13664",
        seatsCapacity: 19,
        seatsRemaining: 1,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13664",
        profs: ["Justin Silvestri", "Laurie Kramer", "Katelyn McCreedy"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Kariotis Hall 302",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13665",
        seatsCapacity: 19,
        seatsRemaining: 3,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13665",
        profs: ["Justin Silvestri", "Laurie Kramer", "Khyle Hannan"],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "International Village 018",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "18373",
        seatsCapacity: 19,
        seatsRemaining: 5,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18373",
        profs: ["Linda Ayrapetov", "Justin Silvestri", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 226",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "14578",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=14578",
        profs: ["Justin Silvestri", "Laurie Kramer", "Cynthia Wilkerson"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ryder Hall 158",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13669",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13669",
        profs: [
          "Justin Silvestri",
          "Laurie Kramer",
          "Samyuktaa Sanjeev Chawla",
        ],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Behrakis Health Sciences Cntr 307",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13647",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535996,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13647",
        profs: ["Justin Silvestri", "Jeremy Kazanjian-Amory", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Kariotis Hall 005",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13649",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13649",
        profs: ["Justin Silvestri", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 155",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13661",
        seatsCapacity: 19,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13661",
        profs: ["Justin Silvestri", "Laurie Kramer", "Haley Medeiros"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Behrakis Health Sciences Cntr 307",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19574",
        seatsCapacity: 19,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19574",
        profs: ["Chong Kim-Wong", "Justin Silvestri", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 206",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19573",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19573",
        profs: ["Justin Silvestri", "Laurie Kramer", "Nora Salmon"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "International Village 013",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "18370",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18370",
        profs: ["Justin Silvestri", "Laurie Kramer", "Khyle Hannan"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ryder Hall 265",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "18371",
        seatsCapacity: 19,
        seatsRemaining: 1,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=18371",
        profs: ["Justin Silvestri", "Laurie Kramer", "Kali Boston"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ryder Hall 158",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "20737",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453536000,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=20737",
        profs: ["Justin Silvestri", "Laurie Kramer", "Khyle Hannan"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 69600,
                  start: 65700,
                },
              ],
            },
            where: "Hastings Suite 105",
            endDate: 18978,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13655",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13655",
        profs: ["Justin Silvestri", "Marrian Mitry", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Richards Hall 140",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13910",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13910",
        profs: ["Justin Silvestri", "Marrian Mitry", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 104",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "14579",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=14579",
        profs: ["Justin Silvestri", "Misa Tran", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Behrakis Health Sciences Cntr 007",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19575",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 5,
        waitRemaining: 5,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19575",
        profs: ["Justin Silvestri", "Laurie Kramer", "Jason Nolen-Doerr"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ell Hall 410",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19576",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19576",
        profs: ["Justin Silvestri", "Alexandra Askenazi", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Ell Hall 411",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19578",
        seatsCapacity: 19,
        seatsRemaining: 1,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19578",
        profs: ["Justin Silvestri", "Laurie Kramer", "Kasey Boston"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 109",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13658",
        seatsCapacity: 19,
        seatsRemaining: 3,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13658",
        profs: ["Justin Silvestri", "Laurie Kramer", "Katelyn McCreedy"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "International Village 018",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "19579",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535999,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=19579",
        profs: ["Justin Silvestri", "Laurie Kramer", "Samuel Salinas"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 110",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "14577",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=14577",
        profs: ["Chong Kim-Wong", "Justin Silvestri", "Laurie Kramer"],
        meetings: [
          {
            type: "Class",
            times: {
              "1": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 106",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13663",
        seatsCapacity: 19,
        seatsRemaining: 4,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535998,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13663",
        profs: ["Justin Silvestri", "Laurie Kramer", "Genevieve Day"],
        meetings: [
          {
            type: "Class",
            times: {
              "3": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 100",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13653",
        seatsCapacity: 19,
        seatsRemaining: 0,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13653",
        profs: ["Justin Silvestri", "Laurie Kramer", "OluwaFemi Koledoye"],
        meetings: [
          {
            type: "Class",
            times: {
              "2": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Behrakis Health Sciences Cntr 750",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
      {
        classType: "Lecture",
        crn: "13670",
        seatsCapacity: 19,
        seatsRemaining: 2,
        waitCapacity: 0,
        waitRemaining: 0,
        lastUpdateTime: 1639453535997,
        campus: "Boston",
        honors: true,
        url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13670",
        profs: ["Justin Silvestri", "Laurie Kramer", "Patricia Wilder"],
        meetings: [
          {
            type: "Class",
            times: {
              "4": [
                {
                  end: 63600,
                  start: 59700,
                },
              ],
            },
            where: "Hastings Suite 100",
            endDate: 18969,
            startDate: 18878,
          },
        ],
      },
    ] as Section[],
  } as Course,
};
