import { parse } from "jsr:@std/csv";

const text = Deno.readTextFileSync("difficulty-database-original.csv");

const data = parse(text, {
  skipFirstRow: true,
  strip: true,
}) as {
  Class: string;
  "Average Difficulty": string;
  "Additional Comments": string;
  Difficulty: string;
  Date: string;
}[];

// Define the structure for a review

// Define the structure for a course
interface Course {
  courseName: string;
  difficulty: string;
  comments: string[];
}

const courseDatabase: Record<string, Course> = {};
let currentClass = "";

for (let i = 0; i < data.length; i++) {
  const row = data[i];

  // If Class column has a value, it's a new class
  if (row.Class && row.Class.trim() !== "") {
    currentClass = row.Class.trim();

    // Initialize the course if it doesn't exist
    if (!courseDatabase[currentClass]) {
      courseDatabase[currentClass] = {
        courseName: currentClass,
        difficulty: row["Average Difficulty"] || "",
        comments: [],
      };
    }
  }

  // Add the review to the current class
  if (
    currentClass &&
    row["Additional Comments"] &&
    row["Additional Comments"].trim() !== ""
  ) {
    courseDatabase[currentClass].comments.push(
      row["Additional Comments"].trim()
    );
  }
}

Deno.writeTextFileSync(
  "difficulty-database-fixed.json",
  JSON.stringify(courseDatabase, null, 2)
);

console.log(
  `Processed ${
    Object.keys(courseDatabase).length
  } courses with a total of ${Object.values(courseDatabase).reduce(
    (acc, course) => acc + course.comments.length,
    0
  )} reviews`
);
