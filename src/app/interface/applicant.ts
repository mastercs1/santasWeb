import { Cycle } from "./cycle";

export interface Applicant {
    surname:string;
    given:string;
    reference:string;
    dob:Date;
    courseCode: string;
    cycle:Cycle
    
}
