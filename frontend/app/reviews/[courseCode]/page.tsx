import { CourseDifficultyComments } from "@/components/courseDifficulty";

export default async function Page({
  params,
}: {
  params: Promise<{ courseCode: string }>;
}) {
  const { courseCode } = await params;

  return <CourseDifficultyComments courseCode={courseCode} />;
}
