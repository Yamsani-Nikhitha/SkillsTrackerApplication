import { Injectable } from '@angular/core';
import { HRManagers } from './HRManagers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateHrDetailsService {

  constructor(private httpClient : HttpClient) { 
  }
  addNewHrManager(theHrManager:HRManagers){
    return this.httpClient.post<HRManagers>("http://localhost:9090/hrManager/addnew", theHrManager);
   }
}
