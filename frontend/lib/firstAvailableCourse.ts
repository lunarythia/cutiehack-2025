/* eslint-disable @typescript-eslint/no-explicit-any */
import courses from "@/data/courses.json";

export const firstAvailableCourse = (input: string) => {
  input = input.replaceAll("*", "");

  if (input.includes(" or ")) {
    const codes = input.split(" or ").map((x) => x.replaceAll(" ", ""));

    // find first available
    for (const c of codes) {
      if (Object.keys(courses).includes(c)) return prettyCode(c);
    }
  }

  if (input.includes("/")) {
    const codes = input.split("/").map((x) => x.replaceAll(" ", ""));

    // find first available
    for (const c of codes) {
      if (Object.keys(courses).includes(c)) return prettyCode(c);
    }
  }

  return input;
};

const prettyCode = (text: string) => {
  const matchIndex = text.search(/\d/);

  if (matchIndex === -1) {
    return text;
  }

  const before = text.substring(0, matchIndex);
  const fromInteger = text.substring(matchIndex);

  return `${before} ${fromInteger}`;
};
