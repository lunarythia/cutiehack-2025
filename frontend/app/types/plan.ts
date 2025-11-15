export type Course = {
    code: string,
    name: string,
    units: number,
    notes?: string
}
export type QuarterPlan = {
    quarter: string,
    courses: Course[]
}
export type Year = {
    year: string,
    quarters: QuarterPlan[]
}