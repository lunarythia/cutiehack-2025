import courses from "@/data/courses.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface CourseMetadata {
  id: number;
  termEffective: string;
  courseNumber: string;
  courseDisplay: string;
  subject: string;
  subjectCode: string;
  college: string;
  collegeCode: string;
  department: string;
  departmentCode: string;
  courseTitle: string;
  durationUnit: null;
  numberOfUnits: null;
  attributes: null;
  gradeModes: null;
  ceu: null;
  courseScheduleTypes: null;
  courseLevels: null;
  creditHourHigh: null;
  creditHourLow: number;
  creditHourIndicator: null;
  lectureHourLow: number;
  lectureHourHigh: null;
  lectureHourIndicator: null;
  billHourLow: number;
  billHourHigh: null;
  billHourIndicator: null;
  labHourLow: number;
  labHourHigh: null;
  labHourIndicator: null;
  otherHourLow: null;
  otherHourHigh: null;
  otherHourIndicator: null;
  description: null;
  subjectDescription: string;
  courseDescription: string;
  division: null;
  termStart: string;
  termEnd: string;
  preRequisiteCheckMethodCde: string;
  anySections: null;
  sections: CourseSection[];
}

export interface CourseSection {
  prerequisites: string;
  id: number;
  term: string;
  termDesc: string;
  courseReferenceNumber: string;
  partOfTerm: string;
  courseNumber: string;
  courseDisplay: string;
  subject: string;
  subjectDescription: string;
  sequenceNumber: string;
  campusDescription: string;
  scheduleTypeDescription: string;
  courseTitle: string;
  creditHours: number;
  maximumEnrollment: number;
  enrollment: number;
  seatsAvailable: number;
  waitCapacity: number;
  waitCount: number;
  waitAvailable: number;
  creditHourHigh: number;
  creditHourLow: number;
  creditHourIndicator: string;
  openSection: true;
  linkIdentifier: string;
  isSectionLinked: true;
  subjectCourse: string;
  faculty: [
    {
      bannerId: string;
      category: null;
      class: string;
      courseReferenceNumber: string;
      displayName: string;
      emailAddress: string;
      primaryIndicator: true;
      term: string;
    }
  ];
  meetingsFaculty: [
    {
      category: string;
      class: string;
      courseReferenceNumber: string;
      faculty: [];
      meetingTime: {
        beginTime: string;
        building: string;
        buildingDescription: string;
        campus: string;
        campusDescription: string;
        category: string;
        class: string;
        courseReferenceNumber: string;
        creditHourSession: number;
        endDate: string;
        endTime: string;
        friday: false;
        hoursWeek: number;
        meetingScheduleType: string;
        meetingType: string;
        meetingTypeDescription: string;
        monday: false;
        room: string;
        saturday: false;
        startDate: string;
        sunday: false;
        term: string;
        thursday: true;
        tuesday: true;
        wednesday: false;
      };
      term: string;
    }
  ];
  reservedSeatSummary: null;
  sectionAttributes: null;
  instructionalMethod: string;
  instructionalMethodDescription: string;
}

export const CourseSchedule = ({ courseCode }: { courseCode: string }) => {
  const code = courseCode.replaceAll(" ", "");

  const courseData: CourseMetadata | null = (
    courses as unknown as Record<string, CourseMetadata>
  )[code];

  if (!courseData) {
    return <span className="text-red-500 text-xs">Not offered this term</span>;
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-zinc-500/15 mt-2 py-2 px-2 rounded-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="-py-1 font-semibold cursor-pointer">
          Course sections <CourseCounts course={courseData} />
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            {/* days of the week */}
            {courseData.sections?.length &&
              courseData.sections.map((section) =>
                section.meetingsFaculty.map((meeting) => (
                  <div
                    className={[
                      "grid gap-1 border-l-2 pl-3",
                      meeting.meetingTime.meetingType == "LEC" &&
                        "border-l-blue-500",
                      meeting.meetingTime.meetingType == "LAB" &&
                        "border-l-green-500",
                      meeting.meetingTime.meetingType == "DIS" &&
                        "border-l-pink-500",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={meeting.courseReferenceNumber}
                  >
                    {/* meeting days */}
                    <div className="flex flex-row py-2">
                      {[
                        [meeting.meetingTime.monday, "M"],
                        [meeting.meetingTime.tuesday, "T"],
                        [meeting.meetingTime.wednesday, "W"],
                        [meeting.meetingTime.thursday, "R"],
                        [meeting.meetingTime.friday, "F"],
                      ].map(([isMeeting, letter]) => (
                        <div
                          className={[
                            "w-5 h-5 text-center flex items-center justify-center border border-blue-900",

                            meeting.meetingTime.meetingType == "LEC" &&
                              "border-blue-600",
                            meeting.meetingTime.meetingType == "LAB" &&
                              "border-green-600",
                            meeting.meetingTime.meetingType == "DIS" &&
                              "border-pink-600",
                            isMeeting
                              ? "bg-black text-white"
                              : "bg-white text-black",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          key={letter as string}
                        >
                          {letter}
                        </div>
                      ))}

                      <div className="ml-2">
                        <CourseTime
                          startTime={meeting.meetingTime.beginTime}
                          endTime={meeting.meetingTime.endTime}
                        />
                      </div>
                    </div>

                    {/* time & instructor */}

                    {section.faculty[0] && (
                      <div>{section.faculty[0].displayName}</div>
                    )}
                  </div>
                ))
              )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const CourseCounts = ({ course }: { course: CourseMetadata }) => {
  const numLectures = course.sections.filter(
    (x) => x.meetingsFaculty[0].meetingTime.meetingType === "LEC"
  ).length;
  const numDiscussion = course.sections.filter(
    (x) => x.meetingsFaculty[0].meetingTime.meetingType === "DIS"
  ).length;
  const numLabs = course.sections.filter(
    (x) => x.meetingsFaculty[0].meetingTime.meetingType === "LAB"
  ).length;

  return (
    <div className="ml-auto flex flex-row gap-1 items-center text-xs">
      {numLectures !== 0 && (
        <div className="bg-blue-400/50 p-1 rounded-md">{numLectures} LEC</div>
      )}
      {numDiscussion !== 0 && (
        <div className="bg-pink-400/50 p-1 rounded-md">
          {numDiscussion} DISC
        </div>
      )}
      {numLabs !== 0 && (
        <div className="bg-green-400/50 p-1 rounded-md">{numLabs} LAB</div>
      )}
    </div>
  );
};

const CourseTime = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const convertMilitaryTime = (time: string) => {
    const hours = parseInt(time.substring(0, 2));
    const minutes = time.substring(2, 4);

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

    return `${displayHours}:${minutes} ${period}`;
  };

  return (
    <span>
      {convertMilitaryTime(startTime)} - {convertMilitaryTime(endTime)}
    </span>
  );
};
