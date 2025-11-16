import type { Year, QuarterPlan, Course } from "@/app/types/plan.ts";
import { getCourse } from "../dataUtils/data";

export const bcoeMajors: string[] = [
  "Bioengineering",
  "Chemical Engineering",
  "Computer Engineering",
  "Computer Science",
  "Computer Science with Business Applications",
  "Data Science",
  "Environmental Engineering",
  "Electrical Engineering",
  "Materials Science and Engineering",
  "Mechanical Engineering",
  "Robotics Engineering"
];

export const data: Year[] = [
  {
    year: "FIRST YEAR",
    quarters: [
      {
        quarter: "Fall",
        courses: [
          { code: "CS 010A", name: "C++ Programming I", units: 4 },
          { code: "ENGL 001A", name: "Beginning Composition", units: 4 },
          { code: "ENGR 001I", name: "Professional Dev. & Mentoring", units: 1 },
          { code: "MATH 009A", name: "First Year Calculus", units: 4 }
        ]
      },
      {
        quarter: "Winter",
        courses: [
          { code: "CS 010B", name: "C++ Programming II", units: 4 },
          { code: "ENGL 001B", name: "Intermediate Composition", units: 4 },
          { code: "MATH 009B", name: "First Year Calculus", units: 4 },
          { code: "MATH/CS 011", name: "Intro to Discrete Structures", units: 4 },
          {code: "AHS007", name: "World Art Images", units: 3}
        ]
      },
      {
        quarter: "Spring",
        courses: [
          { code: "CS 010C", name: "Intro to Data Structures & Algorithms", units: 4 },
          { code: "MATH 009C", name: "First Year Calculus", units: 4 },
          { code: "Breadth", name: "Humanities/Social Sciences", units: 4 }
          // The last spring cell was empty → no course added
        ]
      }
    ]
  },

  {
    year: "SECOND YEAR",
    quarters: [
      {
        quarter: "Fall",
        courses: [
          { code: "MATH 031 or EE 020B", name: "Applied Linear Algebra", units: 4 },
          { code: "CS 100", name: "Software Construction", units: 5 },
          { code: "PHYS 040A", name: "Physics (Mechanics)", units: 5 },
          { code: "MATH 010A", name: "Multivariable Calculus", units: 4 }
        ]
      },
      {
        quarter: "Winter",
        courses: [
          { code: "CS 061", name: "Machine Org. & Assembly Lang. Prog.", units: 4 },
          { code: "CS 111", name: "Discrete Structures", units: 5 },
          { code: "PHYS 040B", name: "Physics (Heat/Waves/Sound)", units: 5 },
          { code: "Breadth", name: "Humanities/Social Sciences", units: 4 }
        ]
      },
      {
        quarter: "Spring",
        courses: [
          { code: "STAT 155", name: "Probability & Statistics for Engr", units: 4 },
          { code: "PHYS 040C", name: "Physics (Electricity/Magnetism)", units: 5 },
          { code: "EE/CS 120A", name: "Logic Design", units: 5 },
          { code: "Breadth", name: "Humanities/Social Sciences", units: 4 }
        ]
      }
    ]
  },

  {
    year: "THIRD YEAR",
    quarters: [
      {
        quarter: "Fall",
        courses: [
          { code: "CS 141", name: "Interm. Data Structures & Algorithms", units: 4 },
          { code: "CS 150", name: "Theory of Automata & Formal Language", units: 4 },
          { code: "Technical Elective**", name: "", units: 4 },
          { code: "Breadth", name: "BIOL 002, or 003, or 005A/LA", units: 4 }
        ]
      },
      {
        quarter: "Winter",
        courses: [
          { code: "CS 161", name: "Design & Architec. of Comp. Sys. & Lab", units: 4 },
          { code: "CS 152", name: "Compiler Design", units: 4 },
          { code: "Technical Elective**", name: "", units: 4 },
          { code: "ENGR 101I", name: "Professional Dev. & Mentoring", units: 1 }
        ]
      },
      {
        quarter: "Spring",
        courses: [
          { code: "CS 153", name: "Design of Operating Systems", units: 4 },
          { code: "ENGR 180W*", name: "Technical Communications", units: 4 },
          { code: "ENGR Breadth Elective", name: "See below for course options", units: 4 },
          { code: "Technical Elective**", name: "", units: 4 }
        ]
      }
    ]
  },

  {
    year: "FOURTH YEAR",
    quarters: [
      {
        quarter: "Fall",
        courses: [
          { code: "CS 179(E-Z) or CS 178A*", name: "Proj in Comp Sc or Proj Seq in CSE", units: 4 },
          { code: "Technical Elective**", name: "", units: 4 },
          { code: "Technical Elective**", name: "", units: 4 },
          { code: "Breadth", name: "Humanities/Social Sciences", units: 4 }
        ]
      },
      {
        quarter: "Winter",
        courses: [
          { code: "CS 178B* or Technical Elective**", name: "Proj Seq in CSE or Technical Elect", units: 4 },
          { code: "Technical Elective**", name: "", units: 4 },
          { code: "ENGR Depth Elective", name: "See below for course options", units: 4 },
          { code: "Breadth", name: "Humanities/Social Sciences", units: 4 }
        ]
      },
      {
        quarter: "Spring",
        courses: [
          { code: "Technical Elective**", name: "", units: 4 },
          { code: "Technical Elective**", name: "", units: 4 },
          { code: "Breadth", name: "Humanities/Social Sciences", units: 4 }
          // last spring is empty in the chart → no course
        ]
      }
    ]
  }
];
//Save to local storage
export function getCoursesBefore(r: number, c: number){
  let f: Course[] = [];
  let cursor = {r: 0, c: 0};
  while(cursor.r!=r||cursor.c!=c){
    for(let cu of data[cursor.r].quarters[cursor.c].courses){
      f.push(cu);
    }
    cursor.c++;
    if(cursor.c>2){
      cursor.c = 0;
      cursor.r++;
    }else if(cursor.c<0){
      cursor.c = 2;
      cursor.r--;
    }
  }
  return f;
}