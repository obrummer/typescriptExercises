export interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals" | "Advanced";
  description: string;
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBase {
  name: "Backend development";
  description: string;
  requirements: string[];
}

export type CourseName = {
  courseName: string;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  description?: string;
  exerciseSubmissionLink?: string;
  groupProjectCount?: number;
  requirements?: string[];
}

interface CoursePartBaseTwo {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseNormalPart extends CoursePartBase {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBaseTwo {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
