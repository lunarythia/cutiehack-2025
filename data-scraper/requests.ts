const cookie = `JSESSIONID=C0D4B93DAFF3884E168F3CD9A2AB02C6; JSESSIONID=FD13662E6DE9E31FCDE21E1BF004E9AB; BIGipServerp_registrationssb.ucr.edu_8443=!SiiivqGes2S4Qenrh4APOtIG/qWRoxORnX8x4QhhOJpnIBTk7pyZbI9RmxhrMnW2rWcVX/DOLhHw3gg=`;

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
}

export interface ExtendedCourse {
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

export const fetchCourses = async (offset: number) => {
  const res = await fetch(
    `https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/courseSearchResults/courseSearchResults?txt_term=202610&startDatepicker=&endDatepicker=&uniqueSessionId=jjjzu1763223617707&pageOffset=${offset}&pageMaxSize=500&sortColumn=subjectDescription&sortDirection=asc`,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:142.0) Gecko/20100101 Firefox/142.0",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.5",
        "X-Synchronizer-Token": "3e309e26-45c2-4773-bce0-d66e4b41a347",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Priority: "u=0",
        cookie,
      },
      referrer:
        "https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/courseSearch/courseSearch",
      method: "GET",
      mode: "cors",
    }
  );

  return res.json() as Promise<{
    data: CourseMetadata[];
  }>;
};

export const fetchPrerequisites = async (
  subject: string,
  courseNumber: string
) => {
  const res = await fetch(
    "https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/courseSearchResults/getPrerequisites",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:142.0) Gecko/20100101 Firefox/142.0",
        Accept: "text/html, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.5",
        "X-Synchronizer-Token": "438b2bee-8c27-4ab2-94f1-432e3bca2f0a",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Priority: "u=0",
      },
      referrer:
        "https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/courseSearch/courseSearch",
      body: `term=202610&subjectCode=${subject}&courseNumber=${courseNumber}`,
      method: "POST",
      mode: "cors",
    }
  );

  return res.text();
};

// accepts course code in format SUBJ0000
export const fetchCourseSections = async (courseCode: string) => {
  const res = await fetch(
    `https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_subjectcoursecombo=${courseCode}&txt_term=202610&startDatepicker=&endDatepicker=&uniqueSessionId=${crypto.randomUUID()}&pageOffset=0&pageMaxSize=10&sortColumn=subjectDescription&sortDirection=asc`,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:142.0) Gecko/20100101 Firefox/142.0",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.5",
        "X-Synchronizer-Token": "8eb03f9d-dce4-4d8f-a880-81b8e5bf2d9b",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Priority: "u=0",
        cookie,
      },

      referrer:
        "https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/classSearch/classSearch",
      method: "GET",
      mode: "cors",
    }
  );

  return res.json() as Promise<{ data: ExtendedCourse[] }>;
};

export const resetForm = () => {
  return fetch(
    "https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/classSearch/resetDataForm",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:142.0) Gecko/20100101 Firefox/142.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "X-Synchronizer-Token": "8eb03f9d-dce4-4d8f-a880-81b8e5bf2d9b",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Priority: "u=0",
        cookie,
      },
      referrer:
        "https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/classSearch/classSearch",
      method: "POST",
      mode: "cors",
    }
  );
};
