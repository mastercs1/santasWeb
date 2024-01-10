import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PreferenceDetails } from '../interface/preference-details';
import { PreferenceOverallDeemStatus } from '../interface/preference-overall-deem-status';

@Injectable({
  providedIn: 'root'
})
export class PreferenceServiceService {
 
  private preferenceIdSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private preferenceDetailsUrl = 'http://localhost:8089/santasweb/applicant/preferencedetails';
  private preferenceOverallDeemUrl="http://localhost:8089/santasweb/applicant/preferencedetails/overalldeem/";
  constructor(private http: HttpClient) { }


  setPreferenceId(preferenceId: string) {
    this.preferenceIdSubject.next(preferenceId);
  }

  getPreferenceId() {
    return this.preferenceIdSubject.asObservable();
  }
  
  getPreferenceDetails(preferenceId:string): Observable<PreferenceDetails>{
    const getIndividualUrl = `${this.preferenceDetailsUrl}/`+preferenceId;
    return this.http.get<PreferenceDetails>(getIndividualUrl);
  }

  getOverallDeem(preferenceId:string): Observable<PreferenceOverallDeemStatus>{
    const getIndividualUrl = `${this.preferenceOverallDeemUrl}/`+preferenceId;
    return this.http.get<PreferenceOverallDeemStatus>(getIndividualUrl);
  }
}

