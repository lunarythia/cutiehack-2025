import { processRequirements } from "../plan/planner";

export default async function Page({
  params,
}: {
  params: Promise<{ courseCode: string }>;
}) {
  const { courseCode } = await params;

  return <p>
    {JSON.stringify(processRequirements("BCOE-CS", [{
    name: "HELLO",
    code: "MATH 011",
    units: 4
}]))}
  </p>;
}
