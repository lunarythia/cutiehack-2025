import { fetchCourseSections, resetForm } from "./requests.ts";

await resetForm();
console.log(await fetchCourseSections("MATH010A"));
