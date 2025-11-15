import { CourseMetadata, fetchCourseSections } from "./requests.ts";

const allCourses = Deno.readTextFileSync("courses.jsonl")
  .split(/\r?\n/g)
  .filter(Boolean)
  .map((line) => JSON.parse(line) as CourseMetadata);

const outfile = Deno.openSync("courses-extended.jsonl", {
  create: true,
  append: true,
});

for (const course of allCourses) {
  const sections = await fetchCourseSections(
    course.subjectCode + course.courseNumber
  );

  //   console.log(sections);
  if (!sections.data?.length) continue;

  console.log(
    `${course.subjectCode}${course.courseNumber}`,
    course.courseTitle,
    "got",
    sections.data.length,
    "sections"
  );

  const text = new TextEncoder().encode(
    JSON.stringify({
      ...course,
      sections: sections.data,
    }) + "\n"
  );

  outfile.write(text);
}
