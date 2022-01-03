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

    // Tech and human values
  phil1145_202210() {
    return {
      termId: "202210",
      subject: "PHIL",
      classId: "1145",
      name: "Technology and Human Values",
      coreqs: {
        type: "and",
        values: [],
      },
      sections: [
        {
          classType: "Lecture",
          crn: "16941",
          seatsCapacity: 40,
          seatsRemaining: 1,
          waitCapacity: 10,
          waitRemaining: 10,
          lastUpdateTime: 1639767552189,
          campus: "Boston",
          honors: false,
          url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=16941",
          profs: ["Meica Magnani"],
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
                "5": [
                  {
                    end: 48300,
                    start: 42300,
                  },
                ],
              },
              where: "Shillman Hall 210",
              endDate: 18969,
              startDate: 18878,
            },
            {
              type: "Final Exam",
              times: {
                "4": [
                  {
                    end: 54000,
                    start: 46800,
                  },
                ],
              },
              where: "Hurtig Hall 130",
              endDate: 18977,
              startDate: 18977,
            },
          ],
        },
        {
          classType: "Lecture",
          crn: "12155",
          seatsCapacity: 40,
          seatsRemaining: 0,
          waitCapacity: 10,
          waitRemaining: 10,
          lastUpdateTime: 1639767552189,
          campus: "Boston",
          honors: false,
          url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=12155",
          profs: ["Vance Ricks"],
          meetings: [
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
              where: "Dodge Hall 270",
              endDate: 18969,
              startDate: 18878,
            },
          ],
        },
        {
          classType: "Lecture",
          crn: "13532",
          seatsCapacity: 40,
          seatsRemaining: 0,
          waitCapacity: 10,
          waitRemaining: 10,
          lastUpdateTime: 1639767552189,
          campus: "Boston",
          honors: false,
          url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13532",
          profs: ["Meica Magnani"],
          meetings: [
            {
              type: "Final Exam",
              times: {
                "4": [
                  {
                    end: 36000,
                    start: 28800,
                  },
                ],
              },
              where: "West Village G 102",
              endDate: 18977,
              startDate: 18977,
            },
            {
              type: "Class",
              times: {
                "1": [
                  {
                    end: 48300,
                    start: 42300,
                  },
                ],
                "4": [
                  {
                    end: 48300,
                    start: 42300,
                  },
                ],
              },
              where: "Dodge Hall 470",
              endDate: 18969,
              startDate: 18878,
            },
          ],
        },
        {
          classType: "Lecture",
          crn: "13132",
          seatsCapacity: 41,
          seatsRemaining: 0,
          waitCapacity: 10,
          waitRemaining: 10,
          lastUpdateTime: 1639767552189,
          campus: "Boston",
          honors: false,
          url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13132",
          profs: ["Chad Lee-Stronach"],
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
              where: "Richards Hall 227",
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
              where: "West Village H 110",
              endDate: 18974,
              startDate: 18974,
            },
          ],
        },
        {
          classType: "Lecture",
          crn: "13623",
          seatsCapacity: 40,
          seatsRemaining: 1,
          waitCapacity: 10,
          waitRemaining: 10,
          lastUpdateTime: 1639767552189,
          campus: "Boston",
          honors: false,
          url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13623",
          profs: ["Vance Ricks"],
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
                "5": [
                  {
                    end: 61500,
                    start: 55500,
                  },
                ],
              },
              where: "Forsyth Building 237",
              endDate: 18969,
              startDate: 18878,
            },
          ],
        },
        {
          classType: "Lecture",
          crn: "13624",
          seatsCapacity: 35,
          seatsRemaining: 2,
          waitCapacity: 10,
          waitRemaining: 10,
          lastUpdateTime: 1639767552189,
          campus: "Boston",
          honors: true,
          url: "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202210&crn_in=13624",
          profs: ["John Basl"],
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
                "5": [
                  {
                    end: 48300,
                    start: 42300,
                  },
                ],
              },
              where: "Hayden Hall 424",
              endDate: 18969,
              startDate: 18878,
            },
          ],
        },
      ],
    } as Course;
  },

  honr1102_202210() {
    return {
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
          profs: [
            "Justin Silvestri",
            "Jeremy Kazanjian-Amory",
            "Laurie Kramer",
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
    } as Course;
  },

  /// public speaking
  thtr1170_202210() {
    return {
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
    } as Course;
  },
  // Game engines
  cs4850_202210() {
    return {
      termId: "202230",
      subject: "CS",
      classId: "4850",
      name: "Building Game Engines",
      coreqs: {
        type: "and",
        values: [],
      },
      sections: [sections.cs4850_202210_1()],
    } as Course;
  },
  cs4850_202210_parsed() {
    return {
      ...this.cs4850_202210(),
      sections: [sections.cs4850_202210_1_parsed()],
    };
  },
};
