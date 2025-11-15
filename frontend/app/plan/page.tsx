// AcademicPlan.jsx
import React from "react";

/**
 * Data for the academic plan, transcribed from the image.
 * Each object in the array represents a year.
 * Each year has a `rows` array, where each object represents a row in the table.
 */
const academicPlanData = [
  {
    year: "FIRST YEAR",
    rows: [
      {
        fall: {
          courseCode: "CS 010A",
          courseName: "C++ Programming I",
          units: 4,
        },
        winter: {
          courseCode: "CS 010B",
          courseName: "C++ Programming II",
          units: 4,
        },
        spring: {
          courseCode: "CS 010C",
          courseName: "Intro to Data Structures & Algorithms",
          units: 4,
        },
      },
      {
        fall: {
          courseCode: "ENGL 001A",
          courseName: "Beginning Composition",
          units: 4,
        },
        winter: {
          courseCode: "ENGL 001B",
          courseName: "Intermediate Composition",
          units: 4,
        },
        spring: {
          courseCode: "MATH 009C",
          courseName: "First Year Calculus",
          units: 4,
        },
      },
      {
        fall: {
          courseCode: "ENGR 001I",
          courseName: "Professional Dev. & Mentoring",
          units: 1,
        },
        winter: {
          courseCode: "MATH 009B",
          courseName: "First Year Calculus",
          units: 4,
        },
        spring: {
          courseCode: "Breadth",
          courseName: "Humanities/Social Sciences",
          units: 4,
        },
      },
      {
        fall: {
          courseCode: "MATH 009A",
          courseName: "First Year Calculus",
          units: 4,
        },
        winter: {
          courseCode: "MATH/CS 011",
          courseName: "Intro to Discrete Structures",
          units: 4,
        },
        spring: {}, // Empty cell
      },
    ],
  },
  {
    year: "SECOND YEAR",
    rows: [
      {
        fall: {
          courseCode: "MATH 031 or EE 020B",
          courseName: "Applied Linear Algebra",
          units: 4,
        },
        winter: {
          courseCode: "CS 061",
          courseName: "Machine Org. & Assembly Lang. Prog.",
          units: 4,
        },
        spring: {
          courseCode: "STAT 155",
          courseName: "Probability & Statistics for Engr",
          units: 4,
        },
      },
      {
        fall: {
          courseCode: "CS 100",
          courseName: "Software Construction",
          units: 5,
        },
        winter: {
          courseCode: "CS 111",
          courseName: "Discrete Structures",
          units: 5,
        },
        spring: {
          courseCode: "PHYS 040C",
          courseName: "Physics (Electricity/Magnetism)",
          units: 5,
        },
      },
      {
        fall: {
          courseCode: "PHYS 040A",
          courseName: "Physics (Mechanics)",
          units: 5,
        },
        winter: {
          courseCode: "PHYS 040B",
          courseName: "Physics (Heat/Waves/Sound)",
          units: 5,
        },
        spring: {
          courseCode: "EE/CS 120A",
          courseName: "Logic Design",
          units: 5,
        },
      },
      {
        fall: {
          courseCode: "MATH 010A",
          courseName: "Multivariable Calculus",
          units: 4,
        },
        winter: {
          courseCode: "Breadth",
          courseName: "Humanities/Social Sciences",
          units: 4,
        },
        spring: {
          courseCode: "Breadth",
          courseName: "Humanities/Social Sciences",
          units: 4,
        },
      },
    ],
  },
  {
    year: "THIRD YEAR",
    rows: [
      {
        fall: {
          courseCode: "CS 141",
          courseName: "Interm. Data Structures & Algorithms",
          units: 4,
        },
        winter: {
          courseCode: "CS 161",
          courseName: "Design & Architec. of Comp. Sys. & Lab",
          units: 4,
        },
        spring: {
          courseCode: "CS 153",
          courseName: "Design of Operating Systems",
          units: 4,
        },
      },
      {
        fall: {
          courseCode: "CS 150",
          courseName: "Theory of Automata & Formal Language",
          units: 4,
        },
        winter: {
          courseCode: "CS 152",
          courseName: "Compiler Design",
          units: 4,
        },
        spring: {
          courseCode: "ENGR 180W*",
          courseName: "Technical Communications",
          units: 4,
        },
      },
      {
        fall: { courseCode: "Technical Elective**", courseName: "", units: 4 },
        winter: {
          courseCode: "Technical Elective**",
          courseName: "",
          units: 4,
        },
        spring: {
          courseCode: "ENGR Breadth Elective",
          courseName: "See below for course options",
          units: 4,
        },
      },
      {
        fall: {
          courseCode: "Breadth",
          courseName: "BIOL 002, or 003, or 005A/LA",
          units: 4,
        },
        winter: {
          courseCode: "ENGR 101I",
          courseName: "Professional Dev. & Mentoring",
          units: 1,
        },
        spring: {
          courseCode: "Technical Elective**",
          courseName: "",
          units: 4,
        },
      },
    ],
  },
  {
    year: "FOURTH YEAR",
    rows: [
      {
        fall: {
          courseCode: "CS 179(E-Z) or CS 178A*",
          courseName: "Proj in Comp Sc or Proj Seq in CSE",
          units: 4,
        },
        winter: {
          courseCode: "CS 178B* or Technical Elective**",
          courseName: "Proj Seq in CSE or Technical Elect",
          units: 4,
        },
        spring: {
          courseCode: "Technical Elective**",
          courseName: "",
          units: 4,
        },
      },
      {
        fall: { courseCode: "Technical Elective**", courseName: "", units: 4 },
        winter: {
          courseCode: "Technical Elective**",
          courseName: "",
          units: 4,
        },
        spring: {
          courseCode: "Technical Elective**",
          courseName: "",
          units: 4,
        },
      },
      {
        fall: { courseCode: "Technical Elective**", courseName: "", units: 4 },
        winter: {
          courseCode: "ENGR Depth Elective",
          courseName: "See below for course options",
          units: 4,
        },
        spring: {
          courseCode: "Breadth",
          courseName: "Humanities/Social Sciences",
          units: 4,
        },
      },
      {
        fall: {
          courseCode: "Breadth",
          courseName: "Humanities/Social Sciences",
          units: 4,
        },
        winter: {
          courseCode: "Breadth",
          courseName: "Humanities/Social Sciences",
          units: 4,
        },
        spring: {}, // Empty cell
      },
    ],
  },
];

/**
 * A sub-component to render a single course cell (<td>).
 * It handles the course code, name, and notes.
 */
const CourseCell = ({
  courseCode,
  courseName,
  notes,
}: {
  courseCode?: string;
  courseName?: string;
  notes?: string;
}) => {
  if (!courseCode) {
    // Render an empty cell if no course code is provided
    return <td className="border border-gray-300 p-2 align-top">&nbsp;</td>;
  }
  return (
    <td className="border border-gray-300 p-2 align-top text-left">
      <div className="font-semibold">{courseCode}</div>
      {courseName && <div className="text-sm">{courseName}</div>}
      {notes && <div className="text-xs italic text-gray-600">{notes}</div>}
    </td>
  );
};

/**
 * A sub-component to render a single unit cell (<td>).
 * It centers the text.
 */
const UnitCell = ({ units }: { units?: number }) => {
  return (
    <td className="border border-gray-300 p-2 align-top text-center">
      {/* Use optional chaining in case units is null/undefined */}
      {units ?? ""}
    </td>
  );
};

/**
 * The main component that renders the entire academic plan table.
 */
const AcademicPlan = () => {
  return (
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-lg max-w-7xl mx-auto font-sans">
      <table className="w-full border-collapse border border-gray-300">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 font-bold underline">
              Fall Quarter
            </th>
            <th className="border border-gray-300 p-2 font-bold underline w-16">
              Units
            </th>
            <th className="border border-gray-300 p-2 font-bold underline">
              Winter Quarter
            </th>
            <th className="border border-gray-300 p-2 font-bold underline w-16">
              Units
            </th>
            <th className="border border-gray-300 p-2 font-bold underline">
              Spring Quarter
            </th>
            <th className="border border-gray-300 p-2 font-bold underline w-16">
              Units
            </th>
          </tr>
        </thead>

        {/* Table Body, mapping over the data */}
        <tbody>
          {academicPlanData.map((yearData) => (
            // Use React.Fragment to group elements for each year
            <React.Fragment key={yearData.year}>
              {/* Year Header Row */}
              <tr className="bg-gray-200">
                <td className="text-center font-bold p-2 border border-gray-300" colSpan={6}>
                  {yearData.year}
                </td>
              </tr>

              {/* Course Rows for the year */}
              {yearData.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-gray-50">
                  {/* Fall Quarter */}
                  <CourseCell {...row.fall} />
                  <UnitCell units={row.fall?.units} />

                  {/* Winter Quarter */}
                  <CourseCell {...row.winter} />
                  <UnitCell units={row.winter?.units} />

                  {/* Spring Quarter */}
                  <CourseCell {...row.spring} />
                  <UnitCell units={row.spring?.units} />
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcademicPlan;
