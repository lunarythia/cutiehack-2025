"use client";
import difficultyDatabase from "@/data/difficulty-database-fixed.json";

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
    <div className="grid gap-4">
      {foundEntry.comments.map((comment) => (
        <p key={comment}>{comment}</p>
      ))}
    </div>
  );
};
