import { Injectable , OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, catchError, tap ,throwError} from "rxjs";
import { Cycle } from '../interface/cycle';

@Injectable({
  providedIn: 'root'
})
export class SearchingServiceService {

  constructor(private http: HttpClient) { }

  private cycleUrl = 'http://localhost:8080/cycles';

  getCycles(): Observable<Cycle[]>{
    return this.http.get<Cycle[]>(this.cycleUrl).pipe(
      tap(data=>{console.log(JSON.stringify(data));
    })
    
     );
   }
   

  
}
