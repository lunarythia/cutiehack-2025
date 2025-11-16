"use client";
// AcademicPlan.jsx
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { ConfirmationCloseButton } from "@/components/ConfirmationCloseButton";
import { data, bcoeMajors, getCoursesBefore } from "./pageScript";
import type { Year, Course } from "@/app/types/plan.ts";
import { CourseDifficulty } from "@/components/courseDifficulty";
import { CourseSchedule } from "@/components/courseSchedule";
import { firstAvailableCourse } from "@/lib/firstAvailableCourse";
import { get } from "http";
import { buildChoiceTree, ChoiceTree, processRequirements } from "./planner";

/*export const metadata: Metadata = {
  title: "Four-year plan",
};*/
function stringify(tree: ChoiceTree): string{
    let res = "";
    if(tree.type==="number"){
        res+="Choose "+tree.num+" of ";
    }
    return res;
}

/**
 * A sub-component to render a single course cell (<td>).
 * It handles the course code, name, and notes.
 */
const CourseCell = ({ c, is}: {c:Course, is:boolean }) => {
    if(!c){
        c = {
            code: "",
            name: "",
            notes: "",
            units: 0
        }
    }
    const code = c.code, name = c.name, notes = c.notes;
  if (!code) {
    // Render an empty cell if no course code is provided
    return <td className={`border border-gray-300 ${(is?"bg-yellow-200":"")} p-2 align-top`}>&nbsp;</td>;
  }

  const firstAvail = firstAvailableCourse(code);

  return (
    <td className={`border border-gray-300 ${(is?"bg-yellow-200":"")} p-2 align-top text-left`}>
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
const UnitCell = ({ units, is }: { units?: number, is:boolean }) => {
  return (
    <td className={`border border-gray-300 ${(is?"bg-yellow-200":"")} p-2 align-top text-center`}>
      {/* Use optional chaining in case units is null/undefined */}
      {units ?? ""}
    </td>
  );
};

const LOCAL_STORAGE_KEY = "coursePlan";

type Props = {
  data: Year[];
  cursor: {
    row: number,
    col: number
  }
};
/**
 * The main component that renders the entire academic plan table.
 */
const AcademicPlan = ({ data, cursor}: Props) => {
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
        {data.map((yearData, i) => (
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
              <tr key={rowIndex} className={`even:bg-gray-50`}>
                {yearData.quarters.map((thing, colIndex) => (
                  <React.Fragment key={colIndex}>
                    <CourseCell c={thing.courses[rowIndex]} is={cursor.row === i && cursor.col === colIndex} />
                    <UnitCell units={thing.courses[rowIndex]?.units} is={cursor.row === i && cursor.col === colIndex} />
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
  const rowCheck = 2;
  const [cursor, setCursor] = useState({ row: 0, col: 0 });
    const moveCursor = function(delta: number) {
        setCursor(prev => ({
            col: prev.col+delta<0?rowCheck:((prev.col + delta)%(rowCheck+1)), // 0–2 for 3 quarters
            row: prev.row+(prev.col+delta<0?-1:(prev.col+delta>rowCheck?1:0))
        }));
    }

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
            const plan = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (plan) {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              setPlan(data);
              toast.success("Plan reset!");
            } else {
              toast.error("No saved plan to reset.");
            }
            const major = localStorage.getItem("selectedMajor");
            if (major) {
              localStorage.removeItem("selectedMajor");
              (document.getElementById("majorDropdown") as HTMLSelectElement).value = "Computer Science";
            }
            break;
          default:
            break;
        }
      },
    });
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem("selectedMajor", event.target.value);
    toast.success(`Selected major ${event.target.value}!`);
  };

  const selectedMajor = (): string => {;
    return localStorage.getItem("selectedMajor") ?? "Computer Science";
  }

  let final = buildChoiceTree(processRequirements("", getCoursesBefore(cursor.row, cursor.col)));

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
          <button onClick={() => moveCursor(-1)}>◀</button>
        <button onClick={() => moveCursor(1)}>▶</button>

          <div className="w-2" />
          <p className="translate-y-1/4">Choose your major:</p>
          <select id="majorDropdown" onChange={handleChange} defaultValue={selectedMajor()} className="border border-gray-300 rounded px-2 py-1">
            {bcoeMajors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>
        <AcademicPlan data={plan} cursor={cursor}></AcademicPlan>
      </div>
      <p>{stringify(final)}</p>
    </div>
  );
};

export default Page;
