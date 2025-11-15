import { fetchCourses } from "./requests.ts";

const file = Deno.openSync("courses.jsonl", { create: true, append: true });

let offset = 0;

while (true) {
  const courses = await fetchCourses(offset);

  console.log("Got", courses.data.length, "courses");

  if (courses.data.length !== 0) {
    offset += courses.data.length;
  } else {
    break;
  }

  for (const c of courses.data) {
    const text = new TextEncoder().encode(JSON.stringify(c) + "\n");

    file.writeSync(text);
  }
}
