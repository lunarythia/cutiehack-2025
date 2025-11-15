// AcademicPlan.jsx
import type { Metadata } from "next";
import React from "react";
import {data} from "./pageScript";
import type { Year, QuarterPlan, Course } from "@/app/types/plan.ts";

export const metadata: Metadata = {
  title: "Four-year plan",
};

/**
 * Data for the academic plan, transcribed from the image.
 * Each object in the array represents a year.
 * Each year has a `rows` array, where each object represents a row in the table.
 */
const academicPlanData = data;

/**
 * A sub-component to render a single course cell (<td>).
 * It handles the course code, name, and notes.
 */
const CourseCell = ({
  code,
  name,
  notes,
}: Course) => {
  if (!code) {
    // Render an empty cell if no course code is provided
    return <td className="border border-gray-300 p-2 align-top">&nbsp;</td>;
  }
  return (
    <td className="border border-gray-300 p-2 align-top text-left">
      <div className="font-semibold">{code}</div>
      {name && <div className="text-sm">{name}</div>}
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
              {Array.from({length: 4}).map((_, rowIndex) => (
                <tr key={rowIndex} className="even:bg-gray-50">
                  {yearData.quarters.map((thing, colIndex)=>(
                    <><CourseCell {...thing.courses[rowIndex]} />
                    <UnitCell units={thing.courses[rowIndex]?.units} />
                  </>))}
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
