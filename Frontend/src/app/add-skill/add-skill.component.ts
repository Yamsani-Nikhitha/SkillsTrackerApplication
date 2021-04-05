import { Component, OnInit } from '@angular/core';
import { SkillsEntry } from '../search-associate/skillsEntry';
import { SkillsTrackerService } from '../skills-tracker.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {


  theSkillEntry : SkillsEntry = new SkillsEntry();
  responseDetails: any;
  constructor(private theService:SkillsTrackerService,private router:Router,private httpClient:HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {

    let responseDataBack = this.httpClient.get("http://localhost:8065/api/associates/skillentry");
    responseDataBack.subscribe((responseData)=>
    {
      console.log(responseData);
      console.log(responseData[0]);
      this.responseDetails = responseData;
      console.log(this.responseDetails[0]);
      
    });

  }


  //adds skills to the skills entry database
  addSkill(){
    let responseDataBack = this.theService.addSkillsInSkillsEntry(this.theSkillEntry);
    responseDataBack.subscribe((responseData)=>
    {
     if(responseData.message=="Skill added successfully")
      {
        console.log("success")
        console.log(responseData);
      this.toastr.success(responseData.message, "Success");
      this.router.navigate(['/search-associate']);
      }
      else
      {
        console.log("fail");
        console.log(responseData);
        this.toastr.error(responseData.message, "Error");
      }
     
    });
  }

}
