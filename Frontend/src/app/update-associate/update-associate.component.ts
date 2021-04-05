import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Associates } from '../associates';

@Component({
  selector: 'app-update-associate',
  templateUrl: './update-associate.component.html',
  styleUrls: ['./update-associate.component.css']
})
export class UpdateAssociateComponent implements OnInit {

  theAssociate : Associates = new Associates(); 
  associateId : any;
  responseData : any;
  constructor(private route: ActivatedRoute,private httpClient:HttpClient,private router:Router) { }

  ngOnInit(): void {

    //the associate is send through the router link and assign to your local variable to access it 
   console.log('1');
    this.route.paramMap.subscribe(params=>{
      this.associateId = params.get('id');
      console.log(this.associateId);
    });
    this.associateFormStaticContent();

    
  }

  associateFormStaticContent(){

    //get details of particular associate based on associate Id...
    let responseDataBack = this.httpClient.get("http://localhost:8065/api/associates/associateId/"+this.associateId);
    responseDataBack.subscribe((responseData)=>
    {
      this.responseData = responseData;
      console.log(this.responseData.profilePhoto);
      console.log(this.responseData.associateEmail);
    });
  }

  graphFlag : boolean =true;
  displayGraph(){
    this.graphFlag = true;
    
  }

  
}
