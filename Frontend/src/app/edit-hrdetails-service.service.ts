import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EditHrManagers } from './edit-hr-details/EditHRManagers';

@Injectable({
  providedIn: 'root'
})
export class EditHRDetailsServiceService {

  constructor(private httpClient : HttpClient) {  }
  editHrManager(theHrManager1){
    return this.httpClient.post<EditHrManagers>("http://localhost:9095/hrManager/updatePassword", theHrManager1);
   }
}

