import { Injectable , OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, catchError, tap ,throwError} from "rxjs";
import { Cycle } from '../interface/cycle';
import { NoteResponse } from '../interface/noteResponse';
import { Note } from '../interface/note';
import { Address } from '../interface/address';
import { AppDetails } from '../interface/app-details';
import { ApplicantResponse } from '../interface/applicantResponse';
import { Preference } from '../interface/preference';

@Injectable({
  providedIn: 'root'
})
export class SearchingServiceService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCycles();
  }
  private cycleUrl = 'http://localhost:8089/santasweb/cycles';
  private applicantUrl = 'http://localhost:8089/santasweb/applicants';
  private noteRul='http://localhost:8089/santasweb/note';
  private addressRul='http://localhost:8089/santasweb/applicants/address';
  private appdetailsRul='http://localhost:8089/santasweb/applicants/details';
  private preferenceUrl='http://localhost:8089/santasweb/applicant/preference';
 
  
  getCycles(): Observable<Cycle[]>{
    return this.http.get<Cycle[]>(this.cycleUrl).pipe(

      tap(data=>{console.log(JSON.stringify(data));
    })
    
     );
   }

// passing applicant in request to get list of <applicant>
//todo add headeroption and send as jSON payload , backend need to define the payload json and change the methods. 
//currently it is call the url but without the payload. 
   getApplicants(surname:string, 
                 givens:string,
                 reference:string,
                 dob:string,
                 courseCode:string,
                 cycle:string,
                 offset:number,
                 pageNumber: number): Observable<ApplicantResponse>{
    const getIndividualUrl = `${this.applicantUrl}`
   
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    
    let options = { headers: headers };

    const requestBody = {
      surname, 
      givens, 
      reference,
      dob,
      courseCode,
      cycle,
      offset,
      pageNumber
    };

    console.log(requestBody);
    return  this.http.post<ApplicantResponse>(getIndividualUrl,JSON.stringify(requestBody),options);
  
   }
   
   //post add note 
  
  addNote (applicantId :string, note:string,whoCreated:string) :Observable <any>{
    const getIndividualUrl = `${this.noteRul}/`+applicantId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
      let options = { headers: headers };
      const requestBody = {
        applicantId, 
        note,
        whoCreated
      };
  
      return  this.http.post<any>(getIndividualUrl,JSON.stringify(requestBody),options);
  }
  // get notes for an applicant 
  getNotes(applicantId:string): Observable<Note[]>{
    const getIndividualUrl = `${this.noteRul}/`+applicantId;
    return this.http.get<Note[]>(getIndividualUrl);
  } 

  getIdentification(applicantId:string): Observable<any[]>{
    const getIndividualUrl = `${this.applicantUrl}/`+applicantId;
    return this.http.get<any[]>(getIndividualUrl);
  } 

  getAddress(applicantId:string): Observable<Address[]>{
    const getIndividualUrl = `${this.addressRul}/`+applicantId;
    return this.http.get<Address[]>(getIndividualUrl);
  } 

  getAppDetails(applicantId:string): Observable<AppDetails>{
    const getIndividualUrl = `${this.appdetailsRul}/`+applicantId;
    return this.http.get<AppDetails>(getIndividualUrl);
  } 

  getPreference(applicantId:string): Observable<Preference[]>{
    const getIndividualUrl = `${this.preferenceUrl}/`+applicantId;
    return this.http.get<Preference[]>(getIndividualUrl);
  }
}
