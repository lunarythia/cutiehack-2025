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
  if (classCode && reviews[classCode] == null)
    reviews[classCode] = {
      difficulty: data[i]["Average Difficulty"],
      comments: [],
    };

  if (classCode) {
    for (let y = i; y < data.length; y++) {
      if (data[y].Class === "") {
        reviews[classCode].comments.push(data[y]["Additional Comments"]);
      } else {
        break;
      }
    }
  }

  reviews[classCode].comments.push(data[i]["Additional Comments"]);
}

Deno.writeTextFileSync(
  "difficulty-database-fixed.json",
  JSON.stringify(reviews, null, 2)
);
