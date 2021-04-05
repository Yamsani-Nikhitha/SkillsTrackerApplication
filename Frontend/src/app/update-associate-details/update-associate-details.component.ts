import { Component, OnInit, Input } from '@angular/core';
import { Skills } from '../skills';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SkillsTrackerService } from '../skills-tracker.service';
import { ToastrService } from 'ngx-toastr';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-update-associate-details',
  templateUrl: './update-associate-details.component.html',
  styleUrls: ['./update-associate-details.component.css']
})
export class UpdateAssociateDetailsComponent implements OnInit {

  selectedSkillName: string;
  butDisabled: boolean = false;
  divs: number[] = [];
  duplicateSkills: string[] = [];
  theAssociate: any;
  skill: Skills = new Skills;
  theSkill = [];
  responseDetails: any;
  associateId: any;
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: ToastrService, private theService: SkillsTrackerService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.associateId = params.get('id');
      console.log(this.associateId);
    });
    this.associateFormEditableContent();

    //get skills from skills entry database to add skills in combobox
    let responseDataBack = this.httpClient.get("http://localhost:8065/api/associates/skillentry");
    responseDataBack.subscribe((responseData) => {
      console.log(responseData);
      console.log(responseData[0]);
      this.responseDetails = responseData;
    });

  }
  associateFormEditableContent() {

    //gets details based on associate id 
    let responseDataBack = this.httpClient.get("http://localhost:8065/api/associates/associateId/" + this.associateId);
    responseDataBack.subscribe((responseData) => {
      this.theAssociate = responseData;
      console.log(responseData);
      this.theSkill = this.theAssociate.skills;
    });
  }

  editForm() {
    console.log(this.theAssociate.associateName);
  }
  onKey(Event: any) {
    console.log(Event);
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

  test() {
    console.log(this.theSkill.push(this.skill));
  }

 @Input('fileName')fileName="";
 onImageUpload(event) {
   this.fileName=event.target.files[0].name;
   this.theAssociate.profilePhoto = "../../assets/images/" + event.target.files[0].name;
 // this.associateImage="../../assets/images/associateProfiles/" + event.target.files[0].name;
   //console.log(this.associateProfile);
   console.log(this.theAssociate.profilePhoto);
 }
  responseData: any;
  //updates associate details based on associate Id
  updateAssociate() {

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

    else 
    {
      this.theAssociate.skills = this.theSkill;
    let updateDialogRef = this.dialog.open(DialogBoxComponent,
      {
        height: "250px",
        width: "400px",
        position: { bottom: "20%" }
      });
    updateDialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        let responseDataBack = this.theService.updateAssociate(this.theAssociate.associateId, this.theAssociate);
        responseDataBack.subscribe((responseData) => {
          this.responseData = responseData;
          if (responseData.statusCode == 200) {
            console.log(responseData);
            this.toastr.success(responseData.message, "Success");
            this.router.navigate(['/search-associate']);
          }
          else {
            console.log(responseData);
            this.toastr.error(responseData.message, "Error");
          }

        });
      }

    });
  }

    //   let proceed = confirm("do you want to update??");
    //   if(proceed){
    //   let responseDataBack = this.theService.updateAssociate(this.theAssociate.associateId, this.theAssociate);
    //   responseDataBack.subscribe((responseData)=>{
    //     this.responseData = responseData;
    //     if(responseData.statusCode==200)
    //     {
    //       console.log(responseData);
    //     this.toastr.success(responseData.message, "Success");
    //     this.router.navigate(['/search-associate']);
    //     }
    //     else
    //     {
    //       console.log(responseData);
    //       this.toastr.error(responseData.message, "Error");
    //     }

    //   });
    // }

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

  deleteAssociate() {

    let deleteDialogRef = this.dialog.open(DialogBoxComponent,
      {
        height: "250px",
        width: "400px",
        position: { bottom: "20%" }
      });
    deleteDialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        let responseDataBack = this.theService.deleteEmployee(this.theAssociate.associateId);
        responseDataBack.subscribe((responseData) => {
          this.responseData = responseData;
          if (this.responseData.statusCode == 200) {
            this.toastr.success(this.responseData.message, "Success");
            this.router.navigate(['search-associate']);
          }
          else {
            this.toastr.error(this.responseData.message, "Error");
          }


        });
      }

    });

  }


}
