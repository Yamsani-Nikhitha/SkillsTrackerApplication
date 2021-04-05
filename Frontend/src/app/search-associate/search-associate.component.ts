import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-associate',
  templateUrl: './search-associate.component.html',
  styleUrls: ['./search-associate.component.css']
})
export class SearchAssociateComponent implements OnInit {

  @Input ('searchValue') searchValue : string = "";
  responseDataById :  any;
  responseData :  any;
  searchOption:string;

  p: number = 1;
  collection: any[];  
  // router: any;

  constructor(private httpClient:HttpClient,private router:Router) { }

  ngOnInit(): void {
    
    this.searchForAll();
  }
  displaySearchOption(searchOption : any){
    this.searchOption = searchOption.value;
  }
  
  searchForUser(){
    if(this.searchOption == "associateId"){
      let responseUrl = this.httpClient.get("http://localhost:8065/api/associates/associateId/" + this.searchValue);
      responseUrl.subscribe((responseDataById) => {
      this.responseDataById = responseDataById;
      if(responseDataById == null){
        alert("please enter existing id");
      }
      this.responseData=null;
      console.log(responseDataById); });
    }
    else if(this.searchOption == null){
      alert("please select any option");
    }
    else{
      let responseUrl = this.httpClient.get("http://localhost:8065/api/associates/"+
      this.searchOption + "/" + this.searchValue);
      responseUrl.subscribe((responseData) => {
      this.responseData = responseData;
      if(responseData==""){
        alert("please enter correct details");
      }
      console.log(responseData); });
      }
  }
  searchForAll(){
    let responseUrl = this.httpClient.get("http://localhost:8065/api/associates/all");
    responseUrl.subscribe((responseData) => {
    this.responseData = responseData;
    console.log(responseData);  
    this.collection=this.responseData;
    });
  }
  displayCard(evt: MouseEvent){
    console.log(evt);
    this.router.navigate(["/add-skill"]);
  }

}
