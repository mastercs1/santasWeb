import { Cycle } from "./cycle";

export interface Applicant {
    applicantId:string
    surname:string;
    givens:string;
    reference:string;
    dob:Date;
    email: string;
    cycle:Cycle;
    status:string;
}
