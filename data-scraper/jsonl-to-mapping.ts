import { CourseMetadata } from "./requests.ts";

const allCourses = Deno.readTextFileSync("courses-w-prereqs.jsonl")
  .split(/\r?\n/g)
  .filter(Boolean)
  .map((line) => JSON.parse(line) as CourseMetadata);

const out: Record<string, CourseMetadata> = {};

for (const course of allCourses) {
  out[course.subjectCode + course.courseNumber] = course;
}

Deno.writeTextFileSync("courses.json", JSON.stringify(out));
