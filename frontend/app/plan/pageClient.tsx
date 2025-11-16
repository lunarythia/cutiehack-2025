"use client";
// AcademicPlan.jsx
import type { Metadata } from "next";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ConfirmationCloseButton } from "@/components/ConfirmationCloseButton";
import { data } from "./pageScript";
import type { Year, QuarterPlan, Course } from "@/app/types/plan.ts";
import { CourseDifficulty } from "@/components/courseDifficulty";
import { CourseSchedule } from "@/components/courseSchedule";
import { firstAvailableCourse } from "@/lib/firstAvailableCourse";

/*export const metadata: Metadata = {
  title: "Four-year plan",
};*/

/**
 * A sub-component to render a single course cell (<td>).
 * It handles the course code, name, and notes.
 */
const CourseCell = ({ code, name, notes }: Course) => {
  if (!code) {
    // Render an empty cell if no course code is provided
    return <td className="border border-gray-300 p-2 align-top">&nbsp;</td>;
  }

  const firstAvail = firstAvailableCourse(code);

  return (
    <td className="border border-gray-300 p-2 align-top text-left">
      <div className="font-semibold">{firstAvail}</div>
      {name && <div className="text-sm">{name}</div>}
      {notes && <div className="text-xs italic text-gray-600">{notes}</div>}
      {firstAvail && <CourseDifficulty courseCode={firstAvail} />}
      {firstAvail && <CourseSchedule courseCode={firstAvail} />}
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

const LOCAL_STORAGE_KEY = "coursePlan";

type Props = {
  data: Year[];
};
/**
 * The main component that renders the entire academic plan table.
 */
const AcademicPlan = ({ data }: Props) => {
  return (
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
        {data.map((yearData) => (
          // Use React.Fragment to group elements for each year
          <React.Fragment key={yearData.year}>
            {/* Year Header Row */}
            <tr className="bg-gray-200">
              <td
                className="text-center font-bold p-2 border border-gray-300"
                colSpan={6}
              >
                {yearData.year}
              </td>
            </tr>

            {/* Course Rows for the year */}
            {Array.from({
              length: Math.max(
                ...yearData.quarters.map((cour) => cour.courses.length)
              ),
            }).map((_, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-50">
                {yearData.quarters.map((thing, colIndex) => (
                  <React.Fragment key={colIndex}>
                    <CourseCell {...thing.courses[rowIndex]} />
                    <UnitCell units={thing.courses[rowIndex]?.units} />
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

const Page = () => {
  const [plan, setPlan] = useState<Year[]>(() => {
    try {
      const saved =
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_STORAGE_KEY)
          : null;
      return saved ? (JSON.parse(saved) as Year[]) : data;
    } catch {
      return data;
    }
  });

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plan));
    toast.success("Plan saved!");
  };

  const handleLoad = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setPlan(JSON.parse(saved));
      toast.success("Plan loaded!");
    } else {
      toast.error("No saved plan found.");
    }
  };

  const handleReset = () => {
    toast.info("Are you sure you want to reset plan?", {
      closeButton: ConfirmationCloseButton,
      onClose: (response) => {
        switch (response) {
          case true:
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (saved) {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              setPlan(data);
              toast.success("Plan reset!");
            } else {
              toast.error("No saved plan to reset.");
            }
            break;
          default:
            break;
        }
      },
    });
  };
  return (
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-lg max-w-7xl mx-auto font-sans">
      <div>
        <div className="mb-4 flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Plan
          </button>
          <button
            onClick={handleLoad}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Load Plan
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Reset Plan
          </button>
        </div>
        <AcademicPlan data={plan}></AcademicPlan>
      </div>
    </div>
  );
};

export default Page;
