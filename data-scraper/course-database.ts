import { parse } from "jsr:@std/csv";

const text = Deno.readTextFileSync("difficulty-database-original.csv");

const data = parse(text, {
  skipFirstRow: true,
  strip: true,
});

const reviews: Record<
  string,
  {
    difficulty: string;
    comments: string[];
  }
> = {};

for (let i = 0; i < data.length; i++) {
  console.log(data[i]);

  let classCode = data[i].Class;
  if (!reviews[classCode])
    reviews[classCode] = {
      difficulty: data[i]["Average Difficulty"],
      comments: [],
    };

  if (data[i].Class === "") {
    // find the previous course with a set class code and assign it to this one
    for (let j = i; j >= 0; j--) {
      if (data[j].Class !== "") {
        data[i].Class = data[j].Class;
        classCode = data[j].Class;
      }
    }
  }

  reviews[classCode].comments.push(data[i]["Additional Comments"]);
}

Deno.writeTextFileSync(
  "difficulty-database-fixed.json",
  JSON.stringify(reviews, null, 2)
);
