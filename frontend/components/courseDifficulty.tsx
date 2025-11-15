"use client";
import difficultyDatabase from "@/data/difficulty-database-fixed.json";
import BackButton from "./BackButton";

export type DifficultyEntries = Record<
  string,
  {
    difficulty: string;
    comments: string[];
  }
>;

// returns the difficulty out of 10 as a link to the course's reviews, or empty if there are no reviews
export const CourseDifficulty = ({ courseCode }: { courseCode: string }) => {
  const fixedCode = courseCode.replaceAll(" ", "");
  const foundEntry = (difficultyDatabase as DifficultyEntries)[fixedCode];

  if (!foundEntry) return <span />;

  return (
    <div className="grid gap-1">
      <a className="text-blue-500" href={`/reviews/${fixedCode}`}>
        Difficulty: {foundEntry.difficulty} / 10.0
      </a>
    </div>
  );
};

export const CourseDifficultyComments = ({
  courseCode,
}: {
  courseCode: string;
}) => {
  const fixedCode = courseCode.replaceAll(" ", "");
  const foundEntry = (difficultyDatabase as DifficultyEntries)[fixedCode];

  if (!foundEntry) return <span />;

  return (
    // <div style={{margin: '10px'}} >
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-lg max-w-7xl mx-auto font-sans">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <BackButton />
          </div>
          <h1 className="text-3xl text-center">Reviews for {courseCode}</h1>
        </div>
        <div style={{ margin: "7px" }}>
          <CourseDifficulty courseCode={courseCode}></CourseDifficulty>
        </div>
      </div>
      <div className="grid gap-4">
        {foundEntry.comments.map((comment) => (
          <p
            key={comment}
            className="p-2 md:p-4 shadow-lg rounded-lg max-w-7xl mx-auto"
          >
            {comment}
          </p>
        ))}
      </div>
    </div>
  );
};
