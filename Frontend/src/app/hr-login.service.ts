import { Injectable } from '@angular/core';
import { HRManagers } from './HRManagers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HrLoginService {

  constructor(private httpClient : HttpClient) { 
  }
  hrManagerLogin(theHrManager : HRManagers){
    console.log(theHrManager);
    return this.httpClient.post<HRManagers>("http://localhost:9095/hrManager/Login", theHrManager);
   }
}