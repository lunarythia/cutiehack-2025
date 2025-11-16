//STRUCTURE
/*
 - Required classes
 - Electives/Options
 - Choose from group
*/
import { Course } from "../types/plan";
import { getCourse } from "../dataUtils/data";
type CourseRequirement = {
    courseCode: string
    course?: Course
    satisfied?: boolean
}
type CoursesRequirement = {
    courses?: CourseRequirement[],
    breadthCategory?: string,
    unitsRequired?: number
    type: string // "all", "1"
    choice?: number|number[]
    satisfied?: boolean
}
type Requirement = {
    requirements: (Requirement|CoursesRequirement|CourseRequirement)[]
    type: string // "all", "1"
    choice?: number|number[]
    satisfied?: boolean
}
const test: Requirement = { // BREADTH
    type: "all",
    requirements: [
        { // ENGLISH
            type: "all",
            requirements: [
                {
                    type: "1",
                    courses: [
                        {
                            courseCode: "WRIT 010"
                        },
                        {
                            courseCode: "WRIT 010S"
                        }
                    ]
                },
                {
                    type: "1",
                    courses: [
                        {
                            courseCode: "WRIT 020"
                        },
                        {
                            courseCode: "WRIT 020S"
                        }
                    ]
                },
                {
                    type: "1",
                    courses: [
                        {
                            courseCode: "WRIT 030"
                        },
                        {
                            courseCode: "WRIT 030S"
                        },
                        //MORE
                    ]
                },
            ]
        },
        {
            type: "all",
            requirements: [
                {
                    breadthCategory: "BCOE-Hum-A",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-Hum-B",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-Hum-C",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-SS-A",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-SS-B",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-SS-C",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-Ethnicity",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-Upper Division Beadth Courses",
                    unitsRequired: 8,
                    type: "units"
                },
                {
                    breadthCategory: "BCOE-Sci-A",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-Sci-B",
                    type: "1"
                },
                {
                    breadthCategory: "BCOE-Sci-C",
                    type: "2"
                },
            ]
        },
        {
            type: "all",
            requirements: [
                {
                    courses: [
                        {
                            courseCode: "MATH 009A"
                        },
                        {
                            courseCode: "MATH 009B"
                        },
                        {
                            courseCode: "MATH 009C"
                        },
                    ],
                    type: "all"
                },
                {
                    courses: [
                        {
                            courseCode: "MATH 010A"
                        }
                    ],
                    type: "all"
                },
                {
                    courses: [
                        {
                            courseCode: "MATH 011"
                        }
                    ],
                    type: "all"
                },
            ]
        }
    ]
}
// CLASSES ALREADY TAKEN
const deja: Course[] = [
    //
];
function areEqual(c1: Course, c2: Course): boolean{
    return c1.code==c2.code;
}
function getCourseOf(code: string): Course{
    //TODOD
    const t = getCourse(code);
    if(!t){
        return {
            code: code,
            name: code,
            units: 0
        };
    }
    return {
        code: code,
        name: t.courseTitle,
        units: t.creditHourHigh
    }
}
// GO THROUGH THE ENTIRE REQUIREMENT AND FIND CORRESPONDING COURSES
function fillCourses(main: Requirement){
    for(const t of main.requirements){
        if("requirements" in t){
            fillCourses(t);
        }else if("courses" in t&&t.courses!=undefined){
            for(const c of t.courses){
                c.course = getCourseOf(c.courseCode);
            }
        }else if("breadthCategory" in t&&t.breadthCategory!=undefined){
            //TODO
        }else if("type" in t){
            //
        }else{
            t.course = getCourseOf(t.courseCode);
        }
    }
}
//FLAG SATISFIED REQUIREMENTS
function flagRequirements(requirements: Requirement, alreadyTaken: Course[]){
    for(const t of requirements.requirements){
        if("requirements" in t){
            let nc = 0;
            flagRequirements(t, alreadyTaken);
            for(const f of requirements.requirements){
                if(f.satisfied){
                    nc++;
                }
            }
            if(t.type==="all"&&nc==t.requirements.length||nc>=parseInt(t.type)){
                t.satisfied = true;
            }
        }else if("courses" in t&&t.courses!=undefined){
            let nc = 0;
            for(const c of t.courses){
                if(alreadyTaken.some(o=>areEqual(c.course!, o))){
                    c.satisfied = true;
                    nc++;
                }
            }
            if(t.type==="all"&&nc==t.courses.length||nc>=parseInt(t.type)){
                t.satisfied = true;
            }
        }else if("type" in t){
            //should not happen
            console.log("error");
        }else{
            t.satisfied = alreadyTaken.some(o=>areEqual(t.course!, o));
        }
    }
}
function getRequirements(alreadyTaken: Course[], requirements: Requirement): Requirement{
    const newObj = structuredClone(requirements);
    flagRequirements(newObj, alreadyTaken);
    return newObj;
}
//TODO
function getMajorRequirements(major: string){
    return test;
}
export function processRequirements(major: string, alreadyTaken: Course[]): Requirement{
    const reqs = getMajorRequirements(major);
    fillCourses(reqs);
    const remaining = getRequirements(alreadyTaken, reqs);
    return remaining;
}
type ChoiceTree = {
    type: string, // and, or, number, unitcombo
    num?: number,
    list: (ChoiceTree|Course)[]
}
export function buildChoiceTree(reqs: Requirement|CoursesRequirement): ChoiceTree{
    const tree: ChoiceTree = {
        type: reqs.type,
        list: []
    }
    if(reqs.type==="1"){
        tree.type = 'or';
    }else if(reqs.type==="all"){
        tree.type = "and";
    }else{
        tree.type = "number";
        tree.num = parseInt(reqs.type);
    }
    if("courses" in reqs){
        for(const f of reqs.courses!){
            if(!f.satisfied)tree.list.push(f.course!);
        }
    }else if("requirements" in reqs){
        for(const f of reqs.requirements){
            if(!f.satisfied)if(!("type" in f)){
                tree.list.push(f.course!);
            }else{
                tree.list.push(buildChoiceTree(f));
            }
        }
    }
    return tree;
}