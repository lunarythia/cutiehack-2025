import courses from "@/data/courses.json";
export function getCourse(query) {
  for (const key in courses) {
    const course = courses[key];

    if (query === key) {
      return course;
    }

    if (`${course.subjectCode} ${course.courseNumber}` === query) {
      return course;
    }
  }

  return null;
}