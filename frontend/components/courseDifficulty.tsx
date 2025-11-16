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
export const CourseDifficulty = ({
  courseCode,
  noLink,
}: {
  courseCode: string;
  noLink?: boolean;
}) => {
  const fixedCode = courseCode.replaceAll(" ", "");
  const foundEntry = (difficultyDatabase as DifficultyEntries)[fixedCode];

  if (!foundEntry) return <span />;
  if (foundEntry.difficulty.startsWith("See ")) {
    return (
      <CourseDifficulty courseCode={foundEntry.difficulty.split("See ")[1]} />
    );
  }

  const color = getColor(foundEntry.difficulty);

  return (
    <div className="flex flex-row items-center gap-2">
      {noLink ? (
        `Difficulty: ${foundEntry.difficulty} / 10.0`
      ) : (
        <a className="" href={`/reviews/${fixedCode}`}>
          Difficulty: {foundEntry.difficulty} / 10.0
        </a>
      )}
      <div className={`w-3 h-3 rounded-full ${color}`} />
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

  if (foundEntry.difficulty.startsWith("See ")) {
    return (
      <CourseDifficultyComments
        courseCode={foundEntry.difficulty.split("See ")[1]}
      />
    );
  }

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
          <CourseDifficulty noLink courseCode={courseCode}></CourseDifficulty>
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

const getColor = (difficulty: string) => {
  const n = parseInt(difficulty);

  if (n <= 2) return "bg-green-300";
  if (n <= 6) return "bg-green-700";
  if (n <= 7) return "bg-yellow-500";
  if (n <= 9) return "bg-amber-700";
  return "bg-red-500 bg-red-500"; //
};
