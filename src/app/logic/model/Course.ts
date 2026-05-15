import { CourseI } from "../interface/CourseI";

// Modellklassen för kursen
export class Course implements CourseI {
  public code: string;
  public coursename: string;
  public progression: string;
  public syllabus: string;
  
  constructor(code: string, 
    coursename: string,
    progression: string,
    syllabus: string) {
    this.code = code;
    this.coursename = coursename;
    this.progression = progression;
    this.syllabus = syllabus;
  }
}