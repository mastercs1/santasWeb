import { Injectable , OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, catchError, tap ,throwError} from "rxjs";
import { Cycle } from '../interface/cycle';
import { Applicant } from '../interface/applicant';

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

   getApplicants(surname:string, 
                 given:string,
                 reference:string,
                 dob:string,
                 courseCode:string,
                 cycleCode:string): Observable<Applicant[]>{
    const getIndividualUrl = `${this.applicantUrl}`
    const requestBody = {
      surname,
      given,
      reference,
      dob,
      courseCode,
      cycleCode
    };

    return  this.http.post<Applicant[]>(getIndividualUrl,requestBody);
  
   }
   
  
  
}
