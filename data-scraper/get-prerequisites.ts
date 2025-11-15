import { ExtendedCourse, fetchPrerequisites } from "./requests.ts";
import { subjects } from "./subjects.ts";

const allCourses = Deno.readTextFileSync("courses-extended.jsonl")
  .split(/\r?\n/g)
  .filter(Boolean)
  .map((line) => JSON.parse(line) as ExtendedCourse);

const outfile = Deno.openSync("courses-w-prereqs.jsonl", {
  create: true,
  append: true,
});

for (const course of allCourses) {
  const prereqs = await fetchPrerequisites(course.subject, course.courseNumber);

  if (prereqs.includes("No prerequisite information available.")) {
    course.prerequisites = "";
    continue;
  }

  course.prerequisites = prereqs
    .split(`<tbody>`)[1]
    .split(`</tbody>`)[0]
    .split(`<tr>`)
    .map((t, i) => (i < 3 ? "" : t))
    .filter(Boolean)
    .join("<tr>")
    .split(`<td>`)
    .map((t) =>
      t
        .replaceAll(/(\(|\))/g, "")
        .replaceAll("\n", "")
        .replaceAll(/<\/?(tr|td)>/g, "")
        .replaceAll("Course or Test: ", "")
        .replaceAll(/Minimum Grade of (B|C|D)-?/g, "")
        .replaceAll("May not be taken concurrently.", "")
        .replaceAll(/^or\s?/g, "||")
        .replaceAll(/^and\s?/g, "&&")
        .trim()
    )
    .map((t) => {
      Object.keys(subjects).forEach((s) => {
        if (t.includes(s)) t = t.replaceAll(`${s} `, subjects[s]);
      });

      return t;
    })
    .filter(Boolean)
    .join("");

  const text = new TextEncoder().encode(JSON.stringify(course) + "\n");
  outfile.write(text);
}
