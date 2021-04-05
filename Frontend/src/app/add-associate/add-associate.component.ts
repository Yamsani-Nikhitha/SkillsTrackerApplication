import { Component, OnInit } from '@angular/core';
import { SkillsTrackerService } from '../skills-tracker.service';
import { HttpClient } from '@angular/common/http';
import { Associates } from '../associates';
import { Skills } from '../skills';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css']
})
export class AddAssociateComponent implements OnInit {
  selectedSkillName: string;
  butDisabled: boolean = false;
  divs: number[] = [];
imageUrl:any;


  theAssociate: Associates = new Associates();
  skill: Skills = new Skills;
  theSkill = [];
  responseDetails: any;
  selectedFile: File;
  constructor(private httpClient: HttpClient, private dialog: MatDialog, private theService: SkillsTrackerService, private router: Router, private toastr: ToastrService) {
    this.theSkill.push({ skill: "" });
  }

  ngOnInit(): void {


    // if(localStorage.getItem("loginStatus")=="logged in succesfully"){
    //   this.router.navigate(['/add-associate']);
    // }
    // else{
    //   localStorage.setItem('redirectURL','/add-associate');
    //   this.router.navigate(['/login']);
    // }

    // localStorage.setItem("redirectURL","khgcidhug");

    // console.log(localStorage.getItem("redirectURL"));


    //for creating skills in combo box which is obtained from skills entry database
    let responseDataBack = this.httpClient.get("http://localhost:8065/api/associates/skillentry");
    responseDataBack.subscribe((responseData) => {
      console.log(responseData);
      console.log(responseData[0]);
      this.responseDetails = responseData;
      console.log(this.responseDetails[0]);


    });

  }
  display(val: any) {
    console.log("Welcome " + val.toString());

  }
  removeValue(i) {
    if (i != 0) {
      this.theSkill.splice(i, 1);
    }
  }

  addvalue() {
    this.theSkill.push({ skill: "" });
  }

  createDiv(): void {
    console.log("hjkkk");

    this.divs.push(this.divs.length);
  }

  removeDiv(): void {
    this.divs.pop();
  }
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
    this.theAssociate.profilePhoto="../../../assets/images/"+this.selectedFile.name;
    console.log(this.theAssociate.profilePhoto);
    
  }
  test() {
    console.log(this.theSkill.push(this.skill));
  }

  duplicateSkills: string[] = [];
  addNewAssociate() {
    console.log("good");
    if(this.theAssociate.profilePhoto==null)
    {
      this.theAssociate.profilePhoto="../../assets/images/associate-profile.jpeg";
    }
    
    
    console.log(this.theSkill);
    this.duplicateSkills = this.checkDuplicateSkills(this.theSkill);

    console.log(this.duplicateSkills + "welcome");
    if (this.duplicateSkills.length > 0) {
      let duplicateSkillDialog = this.dialog.open(MessageBoxComponent,
        {
         data:{name:"Duplicate Skills"},
          width: "300px",
          position: { bottom: "27%" }
        });
    
    }
    else {
      this.theAssociate.skills = this.theSkill;
      console.log(this.theAssociate);
      let dialogRef = this.dialog.open(DialogBoxComponent,
        {
          height: "250px",
          width: "400px",
          position: { bottom: "20%" }
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result == "true") {
          let responseDataBack = this.theService.addNewAssociate(this.theAssociate);
          responseDataBack.subscribe((responseData) => {

            console.log(responseData.message);
            if (responseData.statusCode == 200) {

              this.toastr.success(responseData.message, "Success");
              this.router.navigate(['/search-associate'])
            }
            else {
              this.toastr.error(responseData.message, "Error");

            }



          });
        }

      });
 
    }

  }
  iter: number = 0;
  results: string[];
  checkDuplicateSkills(skill): string[] {
    console.log(skill.length)
    console.log(skill[0].skillName);
    this.results = [];
    // this.sorted_arr = skill.skillName.sort();
    // console.log(this.sorted_arr);
    for (this.iter = 0; this.iter < skill.length - 1; this.iter++) {
      if (skill[this.iter + 1].skillName == skill[this.iter].skillName) {
        console.log(skill[this.iter].skillName);
        this.results.push(skill[this.iter].skillName);
      }
    }
    console.log(this.results);
    return this.results;
  }


}
