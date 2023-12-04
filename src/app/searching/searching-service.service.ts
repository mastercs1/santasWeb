import { Injectable , OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, catchError, tap ,throwError} from "rxjs";
import { Cycle } from '../interface/cycle';
import { ApplicantResponse }  from '../interface/applicantResponse'

@Injectable({
  providedIn: 'root'
})
export class SearchingServiceService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCycles();
  }
  private cycleUrl = 'http://localhost:8080/santasweb/cycles';

 private applicantUrl = 'http://localhost:8080/santasweb/applicants';
  
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
                 given:string,
                 reference:string,
                 dob:string,
                 courseCode:string,
                 cycleCode:string): Observable<ApplicantResponse>{
    const getIndividualUrl = `${this.applicantUrl}`
   
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    
    let options = { headers: headers };

    const requestBody = {
      surname, 
      given, 
      reference,
      dob,
      courseCode,
      cycleCode
    };

    return  this.http.post<ApplicantResponse>(getIndividualUrl,JSON.stringify(requestBody),options);
  
   }
   
  
  
}
