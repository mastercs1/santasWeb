import { Injectable , OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, catchError, tap ,throwError} from "rxjs";
import { Cycle } from '../interface/cycle';

@Injectable({
  providedIn: 'root'
})
export class SearchingServiceService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCycles();
  }
  private cycleUrl = 'http://localhost:8080/santasweb/cycles';
 
  getCycles(): Observable<Cycle[]>{
    return this.http.get<Cycle[]>(this.cycleUrl).pipe(

      tap(data=>{console.log(JSON.stringify(data));
    })
    
     );
   }
   
  //  getHeros(): Observable<Hero[]>{
  //   return this.http.get<Hero[]>(this.herosUrl).pipe(
  //    tap(data=> console.log(JSON.stringify(data)))
  //   );
  //  }
  
}
