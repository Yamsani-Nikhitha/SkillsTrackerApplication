import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private httpClient : HttpClient) { 
  }
  adminLogin(theAdmin :Admin){
    console.log("dddd");
    return this.httpClient.post<Admin>("http://localhost:9091/Admin/login", theAdmin);
   }
}