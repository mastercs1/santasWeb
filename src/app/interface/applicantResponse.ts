import {Applicant} from './applicant'

export interface ApplicantResponse {
  applicants: Applicant[];
  totalApplicants:number;
}